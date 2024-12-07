
const Home = {
    data() {
        return {
            createRoomNameModal: null, 
            roomName: null,
            setUserNameModal: null,
            userName: null,
            joinRoomModal: null,
            roomID: null
        }
    },
    template: `
        <div class='home'>
            <header>
            <div class="logo">🎵 MusicGuess</div>
            <nav>
                <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">How to Play</a></li>
                <li><a href="#">Leaderboard</a></li>
                <li><a href="#">Login/Sign Up</a></li>
                </ul>
            </nav>
            </header>

            <section class="hero">
            <h1>Test Your Music Knowledge!</h1>
            <p>Guess the song, compete with friends, and climb the leaderboard!</p>
            <div class="cta-buttons">
                <button @click="openJoinRoomModal">Start Playing</button>
                <button @click="openCreateRoomModal">Create a Room</button>
            </div>
            </section>

            <section class="features">
            <div class="feature">
                <div class="icon">🎵</div>
                <h3>Challenge Yourself</h3>
                <p>Play solo and guess as many songs as you can.</p>
            </div>
            <div class="feature">
                <div class="icon">👥</div>
                <h3>Play with Friends</h3>
                <p>Create or join a room to compete with others.</p>
            </div>
            <div class="feature">
                <div class="icon">🏆</div>
                <h3>Climb the Leaderboard</h3>
                <p>Track your progress and see where you stand globally.</p>
            </div>
            </section>

            <footer>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
            </div>
            <div class="social-icons">
                <span>📸</span>
                <span>🐦</span>
                <span>📘</span>
            </div>
            </footer>
                <!-- Modal -->
                <div class="modal fade" id="room-name-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Create Room</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="form-floating">
                                    <textarea @keyup.enter="setRoomName" v-model="roomName" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                    <label for="floatingTextarea">Room Name</label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" @click="setRoomName">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="create-room-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Select Stage Name</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="form-floating">
                                    <textarea @keyup.enter="setUserName" v-model="userName" class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                    <label for="floatingTextarea">User Name</label>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" @click="setUserName">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="join-room-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Join Room</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form class="form-floating">
                                    <input @keyup.enter="setRoomID" v-model="roomID" class="form-control" id="floatingInputValue" placeholder="name@example.com" value="test@example.com">
                                    <label for="floatingInputValue">Room Code</label>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" @click="setRoomID">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    `,
    methods: {
        openJoinRoomModal() {
            const modal = new bootstrap.Modal(document.getElementById('join-room-modal'));
            this.joinRoomModal = modal;
            this.joinRoomModal.show();
        },
        setRoomID(){
            if (this.joinRoomModal){
                this.joinRoomModal.hide()
            }
            const modal = new bootstrap.Modal(document.getElementById('create-room-modal'));
            this.setUserNameModal = modal;
            this.setUserNameModal.show();
        },
        openCreateRoomModal(){
            const modal = new bootstrap.Modal(document.getElementById('room-name-modal'));
            this.createRoomNameModal = modal;
            this.createRoomNameModal.show();
        },
        setRoomName(){
            if(this.createRoomNameModal){
                this.createRoomNameModal.hide();
            }
            const modal = new bootstrap.Modal(document.getElementById('create-room-modal'));
            this.setUserNameModal = modal;
            this.setUserNameModal.show();
        }, 
        setUserName(){
            if(this.setUserNameModal){
                this.setUserNameModal.hide();
            }

            if (this.roomID) {
                this.joinRoom();
            } else {
                this.createRoom();
            }
        }, 
        async joinRoom(){
            let response = await fetch('/joinRoom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'userName': this.userName, 'roomCode': this.roomID})
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const data = await response.json();
            console.log('Joined Room successfully:', data);
            this.$emit('navigate-to', 'Room', this.roomID, data['userID']);
        },
        async createRoom(){
            let response = await fetch('/createRoom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'roomName': this.roomName})
            });
            if (!response.ok) {
                throw new Error('Failed to create room');
            }

            const data = await response.json();
            console.log('Joined Room successfully:', data);
            this.roomID = data['roomCode'];
            this.joinRoom();
        }
    }
};

export default Home;
