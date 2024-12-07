from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(128), nullable=False)
    roomID = db.Column(db.Integer, db.ForeignKey("room.id"))
    score = db.Column(db.Integer, default=0.0)
    last_active = db.Column(db.DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    roomAdmin = db.Column(db.Boolean, default=0)
    choice = db.Column(db.String, nullable=True)

    def __repr__(self):
        return f"User('{self.username}',)"
    
    def set_song_choice(self, song):
        self.choice = ";;break;;".join(song)

    def get_song_choice(self):
        return self.choice.split(';;break;;')
    
class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    roomCode = db.Column(db.String(4), unique=True, nullable=False)
    roomName = db.Column(db.String(64), nullable=False)
    start = db.Column(db.Boolean, default=0)
    play = db.Column(db.Boolean, default=0)

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    roomID = db.Column(db.Integer, db.ForeignKey("room.id"))
    userID = db.Column(db.Integer, db.ForeignKey("user.id"))
    comment = db.Column(db.String(512), nullable=False)

