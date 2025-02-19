/*import { getRandomImage, getRandomQuote } from "./cardUtils.js";

export function renderCards(numCards) {
  const cardsHTML = Array.from({ length: numCards }, () => {
    const randomQuote = getRandomQuote();
    const randomImage = getRandomImage();
    return `
      <div class="card" data-quote-id="${randomQuote.id}">
        <img src="${randomImage.path}" data-image-path="${randomImage.id}" /> 
        <p class="quote">${randomQuote.quote}</p>
        <p class="author">— ${randomQuote.author}</p>
        <button class="generate-new-quote cool-button">Get a New Quote</button>
      </div>
    `;
  }).join('');

  document.querySelector('.js-quote-container').innerHTML = `
    <div class="grid">${cardsHTML}</div>
  `;
} */