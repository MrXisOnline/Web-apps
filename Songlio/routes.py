from flask import render_template, url_for, flash, redirect, request, jsonify, Blueprint, Response
from flask_login import login_user, current_user, logout_user, login_required
from flask_cors import CORS
from models import db, Room, User, Comments
from flask_bcrypt import Bcrypt
import string
import random
from datetime import datetime, timedelta
import datetime as dt
from youtube_search import YoutubeSearch
import yt_dlp
from yt_dlp import download_range_func
import os
from usersoc import *
import asyncio

main = Blueprint('main', __name__)
CORS(main)
bcrypt = Bcrypt()
basedir = os.path.abspath(os.path.dirname(__file__))

async def broadcast_time(room_code):
    for i in range(30, 0, -1):
        socketio.emit('song_time', {'time_left': i}, to=room_code)
        await asyncio.sleep(1)

@main.route('/')
def index():
    # return "Hello"
    return render_template('index.html')

@main.route('/createRoom', methods=['POST'])
def createRoom():
    req = request.json
    name = req['roomName']
    code = ''.join(random.choice(string.ascii_uppercase) for _ in range(4))
    room = Room(
        roomCode=code,
        roomName=name
    )
    db.session.add(room)
    db.session.commit()
    return jsonify({'roomCode': code}), 201

@main.route('/joinRoom', methods=['POST'])
def joinRoom():
    req = request.json
    username = req['userName']
    roomCode = req['roomCode']
    roomID = Room.query.filter_by(roomCode=roomCode).first().id
    if len(User.query.filter_by(roomID=roomID).all()) == 0:
        player = User(
            userName=username, 
            roomID=roomID, 
            roomAdmin=1
        )
    else:
        player = User(
            userName=username, 
            roomID=roomID
        )
    db.session.add(player)
    db.session.commit()
    return jsonify({'message': 'Entered Room Sucessfully', 'userID': player.id}), 201

@main.route('/heartbeat', methods=['POST'])
def heartbeat():
    data = request.get_json()
    user_id = data.get('userId')

    user = User.query.filter_by(id=user_id).first()
    if user:
        user.last_active = datetime.now(dt.timezone.utc)
        db.session.commit()

    return {"success": True}, 200

@main.route('/room-id/<room_code>')
def getRoomID(room_code):
    return jsonify({'roomID':Room.query.filter_by(roomCode=room_code).first().id}), 201

@main.route('/player/<room_code>/<p_id>')
def playerDetails(room_code, p_id):
    room_id = Room.query.filter_by(roomCode=room_code).first().id
    player = User.query.filter_by(id=p_id, roomID=room_id).first()
    if player:
        return jsonify({'player': {'id': p_id, 'roomID': room_id, 'score': player.score, 'isAdmin': player.roomAdmin}}), 201
    return jsonify({'message': 'Bad Request'}), 400

@main.route('/start-game/<room_id>/<p_id>')
def startGame(room_id, p_id):
    return jsonify({'game': 1}), 201

@main.route('/input-song-name/<room_id>/<p_id>', methods=['POST'])
def songInput(room_id, p_id):
    req = request.json
    song_name = req['input']
    results = YoutubeSearch(song_name, max_results=5).to_dict()
    response = []
    for i, res in enumerate(results):
        response.append({
            'id': i, 
            'title': res['title'], 
            'img': res['thumbnails'][0],
            'link': f'https://www.youtube.com{res['url_suffix'].split('&')[0]}'
        })
    return jsonify({'results': response}), 201

@main.route('/selectSong/<room_id>/<p_id>', methods=['POST'])
def selectSong(room_id, p_id):
    req = request.json
    link = req['link']
    if not os.path.exists(os.path.join(basedir, 'static', 'songs', room_id)):
        os.mkdir(os.path.join(basedir, 'static', 'songs', room_id))
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': f'{os.path.join(basedir, 'static', 'songs', room_id)}/{p_id}.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'download_ranges': download_range_func(None, [(30, 60)]),
        'force_keyframes_at_cuts': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([link])
    return jsonify({'message': 'success'}), 201

@main.route('/songChoice/<room_id>/<p_id>', methods=['POST'])
def songChoice(room_id, p_id):
    req = request.json
    song = req['song']
    user = User.query.filter_by(id=p_id, roomID=room_id).first()
    user.set_song_choice([str(song['id']), song['title'], song['img'], song['link']])
    db.session.commit()
    all_ready = 1
    for player in User.query.filter_by(roomID=room_id).all():
        if not player.choice:
            all_ready -= 1
            break
    if all_ready == 1:
        room = Room.query.get(room_id)
        room.start = 0
        room.play = 1
        db.session.commit()
    return jsonify({'message': 'success'}), 201

@main.route('/testroute/<id>')
def test(id):
    user = User.query.get(id)
    if user.choice:
        return jsonify({'name':user.userName, 'choice': user.choice})
    return jsonify({'name':user.userName})

@main.route('/game-state/<room_id>')
def gameState(room_id):
    print(room_id)
    return jsonify({'game': Room.query.get(room_id).start}), 201




