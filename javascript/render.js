import { generateCard,getRandomImage,getRandomQuote } from "./cardUtils.js";

export function renderCards() {
  console.log("renderCards called")
    const currentlyDisplayedImages = [];
    const cardsHTML = Array.from({ length: 3 }, () => {        // idea turn the length munber to variable and let user chose card ammount
      const randomQuote = getRandomQuote();
      const randomImage = getRandomImage(currentlyDisplayedImages);
      
      currentlyDisplayedImages.push(randomImage)

      return generateCard(randomQuote, randomImage);
    }).join('');

    
  
    document.querySelector('.js-quote-container').innerHTML = `
      <div class="grid">${cardsHTML}</div>
    `;
  }