from flask import Flask, Response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_login import LoginManager
import os
from datetime import datetime
import string
import shutil
from models import db
from models import User, Room, Comments
from routes import main, bcrypt
from apscheduler.schedulers.background import BackgroundScheduler
import warnings
from datetime import timedelta
from sqlalchemy import exc as sa_exc
import datetime as dt
from queue import Queue
from usersoc import *


warnings.simplefilter("default")
warnings.simplefilter("ignore", category=sa_exc.LegacyAPIWarning)

app = Flask(__name__)
app.register_blueprint(main)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SECRET_KEY'] = '9bwKfcFqY3j8SYNs'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///"+ os.path.join(basedir,"static", "database.sqlite3")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
socketio.init_app(app)
db.init_app(app)
bcrypt.init_app(app)
scheduler = BackgroundScheduler(daemon=True)
login_manager = LoginManager(app)
HEARTBEAT_TIMEOUT = timedelta(minutes=1)
comments_streams = {}

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@socketio.on("join_room")
def handle_join(data):
    room_code = data["room_code"]
    join_room(room_code)

    # Fetch the initial player data for the room
    room = Room.query.filter_by(roomCode=room_code).first()
    if not room:
        socketio.emit("update_players", [], to=room_code)  # Send empty if room doesn't exist
        return

    roomID = room.id
    players = [
        {
            'id': user.id,
            'userName': user.userName,
            'score': user.score,
            'ready': 'ready' if user.choice else 'none'
        }
        for user in User.query.filter_by(roomID=roomID).all()
    ]
    # Send the initial player data to the room
    socketio.emit("update_players", players, to=room_code)

# Broadcast updated player data to the room when something changes
@socketio.on("update_room")
def handle_update(data):
    room_code = data["room_code"]
    room = Room.query.filter_by(roomCode=room_code).first()
    if not room:
        return

    roomID = room.id
    players = [
        {
            'id': user.id,
            'userName': user.userName,
            'score': user.score,
            'ready': 'ready' if user.choice else 'none'
        }
        for user in User.query.filter_by(roomID=roomID).all()
    ]
    # Broadcast the updated player data to all connected clients in the room
    socketio.emit("update_players", players, to=room_code)

@socketio.on('send_comment')
def postComment(data):
    roomID = Room.query.filter_by(roomCode=data['roomCode']).first().id
    roomID=roomID, 
    userID=data['userID'], 
    comment=data['comment']
    com = Comments(
        roomID=roomID[0], 
        userID=userID[0], 
        comment=comment
    )
    db.session.add(com)
    db.session.commit()
    socketio.emit('new_comment', {'userName': User.query.get(data['userID']).userName, 'text': comment}, to=data['roomCode'])

@socketio.on('start_game')
def startGame(data):
    room_code = data["room_code"]
    socketio.emit('startgame', {'game': 1}, to=room_code)

# Cleanup inactive players (e.g., in a background task)
def remove_inactive_players():
    with app.app_context():
        timeout_threshold = datetime.now(dt.timezone.utc) - HEARTBEAT_TIMEOUT
        inactive_users = User.query.filter(User.last_active < timeout_threshold).all()
        for user in inactive_users:
            roomID = user.roomID
            db.session.delete(user)
            players = [
                {
                    'id': u.id,
                    'userName': u.userName,
                    'score': u.score,
                    'ready': 'ready' if u.choice else 'none'
                }
                for u in User.query.filter_by(roomID=roomID).all()
            ]
            socketio.emit("update_players", players, to=Room.query.get(roomID).roomCode)
        db.session.commit()

scheduler.add_job(remove_inactive_players, 'interval', minutes=2)
scheduler.start()

@app.before_request
def log_request():
    """Log every request made to the app."""
    print(f"Route accessed: {request.path} | Method: {request.method}")

with app.app_context():
    if not os.path.exists(os.path.join(basedir,"static", "database.sqlite3")):
        db.create_all()

if __name__ == '__main__':
    socketio.run(app, debug=True)
    # app.run(debug=True)