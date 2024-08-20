<template>
<div class="background-gradient">
  <component :is="currentComponent" @start="startGame"  @end="endGame" />
</div>
<div v-if="timeStatus" class="timer">
  <h2>Time: {{ formatTime(elapsedTime) }}</h2>
</div> 
<div v-if="confirmation" class="win-container"> 
<h2  > your time is :  {{saved}} </h2> 
</div>
</template>
<script>
import YugiohPictures from './components/YugiohPictures.vue';
import Menus from './components/Menus.vue';
import ending from './components/ending.vue';
export default {
  data() {
    return {
      currentComponent: 'Menus', // Start with Menus component
     startTime: null, // our reference data
      elapsedTime: 0,// our seconds
    timerInterval: null, // variable keeps updating variable
    timeStatus: false,// to activate when the game start the timer
    saved: 0,
    confirmation: false
    };
  },
  components:{
    Menus,
    YugiohPictures,
    ending 
  },
  methods: {
     startGame() { 
      this.currentComponent = 'YugiohPictures'; // Change to YugiohPictures component
      this.startTime = new Date(); // Set the start time
    this.timerInterval = setInterval(this.updateTimer, 1000); // it starts a timer that call updatetimer every second
    this.timeStatus = true
    },
    endGame(){       
      this.saved = this.formatTime( this.elapsedTime   )// saved a constant time when the game ends
               setTimeout(() => {
                this.confirmation = true
    this.timeStatus = false // hiding the timer   
      this.currentComponent = 'ending'; 
    },1250)

    },
    updateTimer() {
    const now = new Date();// new date referece  keep repeating due to setinterval
    this.elapsedTime = Math.floor((now - this.startTime) / 1000); // Calculate elapsed of differences of the start and the update to get seconds
               
              },
    formatTime(seconds) { // transforms to min and seconds
    const minutes = Math.floor(seconds / 60);// minutes
    const secs = seconds % 60; // remaining seconds
    return `${minutes}m ${secs}s`;
  },


  } 
}
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.background-gradient {
   background-color: #ffeddb; /* Gradient from dark pink to light pink */
  height: 100vh; /* Full viewport height */
  margin: 0; /* Remove default margins */ 
}
.timer {
  position: absolute;
  top: 20px; 
  right: 20px; 
  font-size: 1.5rem;
}
.win-container {
  position:absolute;
  top: 300px; 
  left: 550px; 
  font-size: 3rem; /* Adjust size as needed */
  color: #004d00;  /* Dark green color */ 
  
}

</style>