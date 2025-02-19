/*import { responses } from "../data/responses.js";
import { imagesData } from "../data/imagesData.js";
import { activeImages, inactiveImages, activeQuotes, inactiveQuotes  } from './state.js'; 


function getRandomItem(dataArray, inactivePool, activePool) {
    if (inactivePool.length === 0) {
      throw new Error("No inactive items available. This should never happen!");
    }
  
    const randomIndex = Math.floor(Math.random() * inactivePool.length);
    const selectedId = inactivePool.splice(randomIndex, 1)[0]; // Remove from inactive
    activePool.push(selectedId); // Add to active
  
    // Return the full object (image or quote)
    return dataArray.find(item => item.id === selectedId);
  }
  
  // Get a random image
  export const getRandomImage = () => {
    return getRandomItem(imagesData, inactiveImages, activeImages);
  };
  
  // Get a random quote
  export const getRandomQuote = () => {
    return getRandomItem(responses, inactiveQuotes, activeQuotes);
  };
*/