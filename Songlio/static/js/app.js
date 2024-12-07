import Room from './components/Room.js';
import Home from './components/Home.js';

const app = Vue.createApp({
    components: {
        Home,
        Room,
    },
    data() {
      return {
        currentPage: 'Home', 
        roomCode: null, 
        userID: null
      }
    },
    methods: {
      navigateTo(page) {
        console.log('page');
        this.currentPage = page;
      },
      handleNavigation(page, roomCode='', userid='') {
          this.currentPage = page;
          this.roomCode = roomCode;
          this.userID = userid;
      }
    },
    template: `
     <div>
        <component  
            :is="currentPage" 
            :roomCode="roomCode" 
            :userID="userID"
            @navigate-to="handleNavigation">
        </component>
      </div>
    `,
});

app.mount('#app');

