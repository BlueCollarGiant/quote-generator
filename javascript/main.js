import { renderCards } from "./render.js";
import { getRandomQuote } from "./cardUtils.js";


document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('generate-new-quote')) {
      const card = event.target.closest('.card');
      const quoteElement = card.querySelector('.quote');
      const authorElement = card.querySelector('.author');
  
      const newQuote = getRandomQuote();
      quoteElement.textContent = newQuote.quote;
      authorElement.textContent = `— ${newQuote.author}`;
    }
  });
  
  // Run once when the window loads
  window.onload = () => {
    renderCards();
  };