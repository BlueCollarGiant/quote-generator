import { renderCards } from "./render.js";
import { getRandomImage, getRandomQuote } from "./cardUtils.js";


document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('generate-new-quote')) {
      const card = event.target.closest('.card');
      const quoteElement = card.querySelector('.quote');
      const authorElement = card.querySelector('.author');
      const imageElement = card.querySelector("img");
      
      const newQuote = getRandomQuote();
      const newImage = getRandomImage();
      
      quoteElement.textContent = newQuote.quote;
      authorElement.textContent = `— ${newQuote.author}`;
      imageElement.src = newImage;
    }
  });
  
  // Run once when the window loads
  window.onload = () => {
    renderCards();
  };