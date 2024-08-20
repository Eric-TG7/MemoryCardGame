   const shuffleArray= (array = []) =>{ //isher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));// new indexes
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    }
    const randomData= () =>{ //12 random numbers from all the cards of the api 
      const chosenCards = new Set(); // Use Set to ensure unique values
      while (chosenCards.size < 12) {
        const randomNumber = Math.floor(Math.random() * 13281); // Ensure numbers are in the range 0-13280
        chosenCards.add(randomNumber); // Add number to Set
      }
      // Convert Set to Array'
       // an array of twelves with random datas  
   return  Array.from(chosenCards)
     }
export default shuffleArray;
export {randomData}


