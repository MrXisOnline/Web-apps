const joinRoom = {
    props: ['roomCode', 'userID'],
    data() {
        return {
            name: null,
            players: null, 
            roomID: null,
            newComment: "", // Data for the new comment text
            comments: [],
            player: null, 
            game: null,
            play: false,
            inputSongName: null, 
            songSearchResults: null,
            songSRC: null, 
            selectedSong: null, 
            songTitle: null, 
            socket: io()
        };
    },
    template: `
        <div class="room-container room">
            <!-- Room Code -->
            <header class="room-header">
                <h2>Room Code: <span>{{ roomCode }}</span></h2>
            </header>

            <div class="room-body">
                <!-- Player List -->
                <aside class="player-list">
                    <h3>Players</h3>
                    <ul>
                        <li v-for="player in players" :key="player.id">{{ player.userName }} | {{ player.score }} | {{ player.ready }}</li>
                    </ul>
                </aside>

                <main class="game-area">
                    <div v-if="player" class="game-container">
                        <div v-if="game" class="song-guessing">
                            <!-- Input for Song Name -->
                            <div class="song-input">
                                <input 
                                    class="song-name-input" 
                                    type="text" 
                                    v-model="inputSongName" 
                                    placeholder="Type song name..." 
                                    @keyup.enter="submitSongInput"
                                />
                            </div>

                            <!-- Song Search Results -->
                            <div v-if="songSearchResults" class="song-results">
                                <p 
                                    v-for="result in songSearchResults" 
                                    :key="result.id" 
                                    class="song-result-item" 
                                    @click="selectSong(result)"
                                >
                                    {{ result.title }}
                                </p>
                            </div>

                            <!-- Audio Player -->
                            <div class="audio-container">
                                <audio id="songBox" controls></audio>
                            </div>

                            <!-- Selected Song and Button -->
                            <div class="song-choice" v-if="songSRC">
                                <input 
                                    class="song-title-input" 
                                    v-model="songTitle" 
                                    type="text" 
                                    placeholder="Selected song title"
                                />
                                <button class="song-choice-btn" @click="songChoice">Select Song</button>
                            </div>
                        </div>

                        <!-- Admin Start Game -->
                        <div v-else-if="player.isAdmin == 1 && play == false" class="admin-controls">    
                            <button class="start-game-btn" @click="startGame">Start</button>
                        </div>
                        <div v-else-if="play">
                            <h3>Starting Soon...</h3>
                        </div>
                    </div>
                </main>

                <!-- Actions -->
                <aside class="game-actions">
                    <h3>Comment Section</h3>

                    <!-- Display list of comments -->
                    <div class="comments-list">
                        <ul>
                            <li v-for="(comment, index) in comments" :key="index">
                                <p><strong>{{ comment.userName }}:</strong> {{ comment.text }}</p>
                            </li>
                        </ul>
                    </div>

                    <!-- Comment input section (placed below the comments list) -->
                    <input type='text' v-model="newComment" placeholder="Write your comment..." class="comment-input">

                    <!-- Button to submit comment -->
                    <button @click="submitComment">Submit Comment</button>
                </aside>
            </div>
        </div>
    `,
    methods: {
        async gameState(){
            try {
                const response = await fetch(`/game-state/${this.roomID}`);
                const data = await response.json();
                this.game = data.game;  // Assuming the response is { services: [...] }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
        async startGame() {
            try {
                const response = await fetch(`/start-game/${this.roomID}/${this.$props.userID}`);
                const data = await response.json();
                this.game = data.game;  // Assuming the response is { services: [...] }
                this.socket.emit('start_game', { room_code: this.$props.roomCode });
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
        endGame() {
            alert('Game Ended!');
        },
        async submitSongInput(){
            let response = await fetch(`/input-song-name/${this.roomID}/${this.$props.userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'input': this.inputSongName})
            });
            if (!response.ok) {
                throw new Error('Failed');
            }

            const data = await response.json();
            console.log('successful:', data);
            this.inputSongName = '';
            this.songSearchResults = data.results;
            // this.songSRC = `/static/songs/${this.roomID}/${this.$props.userID}.mp3`;
            // let audio = document.getElementById('songBox');
            // audio.src = this.songSRC;
            // audio.load();
        },
        async selectSong(song){
            let response = await fetch(`/selectSong/${this.roomID}/${this.$props.userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'link': song.link})
            });
            if (!response.ok) {
                throw new Error('Failed');
            }
            this.selectedSong = song;
            this.songSRC = `/static/songs/${this.roomID}/${this.$props.userID}.mp3`;
            this.songTitle = song.title;
            let audio = document.getElementById('songBox');
            audio.style.display = 'block';
            audio.src = this.songSRC;
            audio.load();
        },
        async songChoice(){
            this.selectedSong.title = this.songTitle;
            let response = await fetch(`/songChoice/${this.roomID}/${this.$props.userID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'song': this.selectedSong})
            });
            if (!response.ok) {
                throw new Error('Failed');
            }
            this.socket.emit('update_room', {'room_code': this.$props.roomCode});
            this.socket.emit('checkGameState', {'room_code': this.$props.roomCode});
        },
        async getRoomID(){
            try {
                const response = await fetch(`/room-id/${this.$props.roomCode}`);
                const data = await response.json();
                this.roomID = data.roomID;  // Assuming the response is { services: [...] }
                this.gameState();
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
        webSocketEvents() {
            // const socket = io();
            const roomCode = this.$props.roomCode; // Replace with actual room code

            // Join the room
            this.socket.emit("join_room", { room_code: roomCode });

            // Listen for updates
            this.socket.on("update_players", (updatedPlayers) => {
                console.log('hi');
                this.players = updatedPlayers; // Update the players array
            });

            this.socket.on('new_comment', (comment) => {
                this.comments.push(comment);
            });

            this.socket.on('startgame', (game) => {
                this.game = game.game;
            });

            this.socket.on('changeState', (game) => {
                this.game = null;
                this.play = game.play;
            })
        },
        async stay_alive(){
            setInterval(() => {
                fetch('/heartbeat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: this.$props.userID })
                });
            }, 30000); 
        }, 
        async submitComment() {
            this.socket.emit('send_comment', {
                userID: this.$props.userID, 
                roomCode: this.$props.roomCode, 
                comment: this.newComment
            })
            this.newComment = '';
        },
        async getPlayer(){
            try {
                const response = await fetch(`/player/${this.$props.roomCode}/${this.$props.userID}`);
                if (!response.ok) {
                    throw new Error('Failed');
                }
                const data = await response.json();
                this.player = data.player;  // Assuming the response is { services: [...] }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        }
    },
    mounted(){
        this.getRoomID();
        this.webSocketEvents();
        this.stay_alive();
        this.getPlayer();
    }
};

export default joinRoom;
