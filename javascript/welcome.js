import { renderCards } from './render.js';
import { imagesData } from '../data/imagesData.js';
import { responses } from '../data/responses.js';
import { resetState, activeImages, inactiveImages , activeQuotes ,inactiveQuotes } from './state.js'; 
import { getRandomImage, getRandomQuote } from './cardUtils.js'; 
// Initialize on "Generate Cards" button click
document.querySelector('.start-button').addEventListener('click', () => {
  resetState(); // Reset used images and quotes
  const numCards = parseInt(document.getElementById('cardCount').value);
  const maxAllowed = Math.min(6, imagesData.length, responses.length);

  if (numCards > maxAllowed || numCards < 1) {
    alert(`Please choose between 1 and ${maxAllowed} cards.`);
    return;
  }

  // make welcome input go away
  document.querySelector('.welcome-container').classList.add('hidden');
  document.querySelector('.js-quote-container').classList.remove('hidden');
  document.querySelector('.back-button').classList.remove('hidden');// didnt think this would work but hid return button
  // Render cards
  renderCards(numCards);
  //return to the welcome screen
  function resetToWelcome() {
    document.querySelector('.js-quote-container').classList.add('hidden');
    document.querySelector('.welcome-container').classList.remove('hidden');
    document.querySelector('.back-button').classList.add('hidden')
    resetState();
  }
  
  // reset "Back to Start" button
  document.querySelector('.back-button').addEventListener('click', resetToWelcome);


  // Attach regeneration logic to the "Generate New Quote" buttons
  attachRegenerationLogic();
});

function attachRegenerationLogic() {
  document.querySelector('.js-quote-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('generate-new-quote')) {
      const card = event.target.closest('.card');
      const quoteElement = card.querySelector('.quote');
      const authorElement = card.querySelector('.author');
      const imageElement = card.querySelector('img');

      // Get old IDs
      const oldImageId = parseInt(imageElement.dataset.imageId);
      const oldQuoteId = parseInt(card.dataset.quoteId);

      // Move old IDs back to inactive pools
      const imageIndex = activeImages.indexOf(oldImageId);
      if (imageIndex > -1) {
        activeImages.splice(imageIndex, 1);
        inactiveImages.push(oldImageId); // Recycle image
      }

      const quoteIndex = activeQuotes.indexOf(oldQuoteId);
      if (quoteIndex > -1) {
        activeQuotes.splice(quoteIndex, 1);
        inactiveQuotes.push(oldQuoteId); // Recycle quote
      }

      // Get new image/quote from inactive pools
      const newImage = getRandomImage();
      const newQuote = getRandomQuote();

      // Update the card
      quoteElement.textContent = newQuote.quote;
      authorElement.textContent = `— ${newQuote.author}`;
      imageElement.src = newImage.path;
      imageElement.dataset.imageId = newImage.id;
      card.dataset.quoteId = newQuote.id;
    }
  });
}