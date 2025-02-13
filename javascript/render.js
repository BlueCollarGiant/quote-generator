import { generateCard,getRandomImage,getRandomQuote } from "./cardUtils.js";

export function renderCards() {
    const cardsHTML = Array.from({ length: 6 }, () => {        // idea turn the length munber to variable and let user chose card ammount
      const randomQuote = getRandomQuote();
      const randomImage = getRandomImage();
      return generateCard(randomQuote, randomImage);
    }).join('');
  
    document.querySelector('.js-quote-container').innerHTML = `
      <div class="grid">${cardsHTML}</div>
    `;
  }