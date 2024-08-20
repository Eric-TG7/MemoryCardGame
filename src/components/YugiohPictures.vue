<template>
  <div class="image-container"> <!-- to put 8 pictures in row in a container -->
    <div v-for="(n, keyindex) in chosenArray" :key="keyindex" class="image-wrapper">
      <img class="img1" :src="chosenArray[keyindex]" alt="Yugioh card image"  :ref="`img1${keyindex}`"> <!-- the random cards -->
      <img class="img2" :src="fixedImgArray[keyindex]" alt="Yugioh card image" :ref="`img2${keyindex}`" @click="flip(keyindex)"> <!-- the fixed image  -->
    </div>
  </div>
  <div class="top" > <!-- point in the left corner -->
  <h1 > POINTS</h1>
  <h1 >{{ points }}</h1>
</div>
  </template>
  <script>
  import yugiohApi from '@/yugiohApi';
  import shuffleArray from '@/helpers/cardshuffleplace';
  import { randomData } from '@/helpers/cardshuffleplace';  
  export default {
   
   data() {
    return {  
      points: '',// points to win
      chosenIndex: [], // number of randomindexes to put in the chosen array
      chosenArray:[],// the chosen array cards arrays chosen 12 random cards then they will be repeated to make 24
      fixedImgArray:[],// the array of the fixed  card
      flipcount: false,// the status the makes it count if the cards are in pair or not
      counter: 0,// number of times you can pick card, max 2 picks before their flip
      pickedcards:[], // the 2 cards picked to be compared if they same or not 
      value:[] , 
    };
  },
methods:{
 async fetchs() {
  try {
    const response = await  yugiohApi.get();
    if (response.data.data[0].card_images.length > 0) {
 for(let i =0; i<12; i++){
  this.chosenArray[i] = response.data.data[this.chosenIndex[i]].card_images[0].image_url_cropped
 this.fixedImgArray[i] = 'https://images.ygoprodeck.com/images/cards_cropped/6983839.jpg'
 }
 this.chosenArray = this.chosenArray.concat(this.chosenArray)
 this.fixedImgArray = this.fixedImgArray.concat(this.fixedImgArray)
   this.chosenArray = shuffleArray(this.chosenArray)
    } else {
      throw new Error('Card or card images not found');
    }
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error;
  }
},
flip(keyindex) {
    const image = this.$refs[`img2${keyindex}`][0]; // Get the clicked fixed image using a ref 
    console.log(this.counter)
    if ( this.counter <2 ) {// if cards are still not picked 2
      image.classList.add('transparent'); // Toggle the 'transparent' class       
      this.aprove(keyindex)// counter is 0
      this.counter++ // counter is 1 , to fix that after 1 does not become two and tops the if above we create another if below
      if(this.counter >=1 && this.flipcount == true){ // this part is to fix and do not let counter more than a value of 1
  this.counter = 0 // now counter is no more than 1 without affecting the rest of the picked
  this.flipcount = false// we want a connfirmation that cards were chosen in pairs and flipcount is the confirmation
           }       
    }
  },
 randomid(){
  this.chosenIndex = randomData() // index are random numbers
},
 aprove(key){
  this.pickedcards[this.counter] = this.chosenArray[key]  //0 arrays
  this.value[this.counter] = key// primer click 0 es igual a this.value[0] = carta selecionada
  if( this.counter == 1 && this.pickedcards[1] == this.pickedcards[0]){ // if it actua value is same as previous chosen
    this.flipcount =true // flip counts is as a reference to show we did action of pairs
    this.points++ // add a point for each pair found
 }
 else if(this.counter ==1 && this.pickedcards[1] != this.pickedcards[0]) {
  for (let i = 0; i < 24; i++) {
    this.$refs[`img2${i}`][0].classList.add('untouchable');// the rest of the cards cant be touched
}
  setTimeout(() => {
    console.log(this.value)
  this.$refs[`img2${this.value[0]}`][0].classList.remove('transparent');// makes the fixed cards become on top again of the chosen cards
  this.$refs[`img2${this.value[1]}`][0].classList.remove('transparent');
  for (let i = 0; i < 24; i++) {
    this.$refs[`img2${i}`][0].classList.remove('untouchable'); // when the time of 1100 is done all the cards become touchable again
}
  },1100)
  this.flipcount =true // flip counts is as a reference to show we did action of not pairs
 }
},
  },
  watch: {
    points() {
      if (this.points == 12) {
        this.$emit('end');// this watch will  emit this function if even if it is not call so when 12 pairs its win
      }
    },
  }, 
  created() {// these functions execute as soon as is created like random id, or reactive properties as my fetchs function
    this.fetchs();
    this.randomid();  
  }
  }
  </script>
  <style scoped>
.transparent {
  opacity: 0;
  transition: opacity 0.3s ease; /* adds a transition effect */
  pointer-events: none;
}
.untouchable{
  pointer-events: none;
}
  .image-container {
    display: grid;
    grid-template-columns: repeat(8, 2fr);
    gap:20px;
    padding: 10px;
    max-width: 900px;
    margin: 0 auto;
    -webkit-user-drag: none;
  }
  .img1 {
    width: 100px; 
    height: 100px; 
    object-fit: cover; 
    border-radius: 5px; 
position: relative;
pointer-events: none;
user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
.img2{
    position: absolute;
width: 100px; 
    height: 100px; 
    object-fit: cover; 
    border-radius: 5px; 
    cursor: pointer;
    left: -0px;
   
  }
  .image-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}

.big-heading {
  font-size: 4rem; /* the size as needed */
  margin-bottom: 0px; /*  space below the heading */
  top: 50%;
}
.top {
  position: absolute;
  top: 20px; 
  left: 20px; 
  font-size: 1.5em; 
}

  </style>