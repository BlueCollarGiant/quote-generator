import { renderCards } from "./render.js";
import { getRandomImage, getRandomQuote } from "./cardUtils.js";

let currentlyDisplayedImages = [];

document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('generate-new-quote')) {
      const card = event.target.closest('.card');
      const quoteElement = card.querySelector('.quote');
      const authorElement = card.querySelector('.author');
      const imageElement = card.querySelector("img");
      
      const currentImage = imageElement.dataset.imagePath;
      currentlyDisplayedImages = currentlyDisplayedImages.filter(
        (image) => image !== currentImage );
      
      

      const newQuote = getRandomQuote();
      const newImage = getRandomImage(currentlyDisplayedImages);
      
      currentlyDisplayedImages.push(newImage);
      
      quoteElement.textContent = newQuote.quote;
      authorElement.textContent = `— ${newQuote.author}`;
      imageElement.src = newImage;
      imageElement.dataset.imagePath = newImage;
    }
  });
  
  // Run once when the window loads
  window.onload = () => {
    renderCards();
  };