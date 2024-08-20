<template>
   <div class="container">
    <h1>READY FOR THE MEMORY CARD GAME?</h1>
    <button class="custom-button" @click="startGame">START</button>
  </div>
 </template>
 <script>
 export default {
   methods: {
     startGame() {
       this.$emit('start'); 
     }
   }
 }
 </script>
 <style >
 .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  text-align: center;
}
 .custom-button {
   padding: 10px 20px;
   font-size: 16px;
   color: #fff;
   background: linear-gradient(to left, #a9a9a9, #d3d3d3);
   border: none;
   border-radius: 5px;
   cursor: pointer;
   transition: background-color 0.3s ease;
   padding: 40px 80px;
   font-size: 45px;
   margin: 60px 0 0 0; 
 }
 .custom-button:hover {
   background-color: #0056b3;
 }
 </style>