<template>
  <div class="win-container">
  <h1 class="win-message"> you win!</h1>
</div>
</template>
<script>
export default {

}
</script>
 
<style scoped>
.win-container {
  display: flex;
  justify-content:center; /* Center horizontally */
  align-items: center;     /* Center vertically */
  margin-top: -240px;
}

.win-message {
  font-size: 5rem; /* Adjust size as needed */
  color: #004d00;  /* Dark green color */
  margin: 0;       
}

</style>