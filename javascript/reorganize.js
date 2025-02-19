// this file is reorganization ignore what goes on here.
import { imagesData } from "../data/imagesData.js";
import { responses } from "../data/responses.js";


// ========== State Management ==========
let activeImages = [];
let inactiveImages = [];
let activeQuotes = [];
let inactiveQuotes = [];

function resetState() {
  activeImages = [];
  inactiveImages = imagesData.map(img => img.id);
  activeQuotes = [];
  inactiveQuotes = responses.map(quote => quote.id);
}

// ========== Utility Functions ==========
function getRandomItem(dataArray, inactivePool, activePool) {
  if (inactivePool.length === 0) {
    throw new Error("No inactive items available!");
  }
  const randomIndex = Math.floor(Math.random() * inactivePool.length);
  const selectedId = inactivePool.splice(randomIndex, 1)[0];
  activePool.push(selectedId);
  return dataArray.find(item => item.id === selectedId);
}

function getRandomImage() {
  return getRandomItem(imagesData, inactiveImages, activeImages);
}

function getRandomQuote() {
  return getRandomItem(responses, inactiveQuotes, activeQuotes);
}

// ========== Rendering Functions ==========
function renderCards(numCards) {
  const cardsHTML = Array.from({ length: numCards }, () => {
    const randomQuote = getRandomQuote();
    const randomImage = getRandomImage();
    return `
      <div class="card" data-quote-id="${randomQuote.id}">
        <img src="${randomImage.path}" data-image-id="${randomImage.id}" />
        <p class="quote">${randomQuote.quote}</p>
        <p class="author">— ${randomQuote.author}</p>
        <button class="generate-new-quote cool-button">Get a New Quote</button>
      </div>
    `;
  }).join('');

  document.querySelector('.js-quote-container').innerHTML = `
    <div class="grid">${cardsHTML}</div>
  `;
}

// ========== Event Handlers ==========
function handleRegeneration(event) {
  if (event.target.classList.contains('generate-new-quote')) {
    const card = event.target.closest('.card');
    const quoteElement = card.querySelector('.quote');
    const authorElement = card.querySelector('.author');
    const imageElement = card.querySelector('img');

    // Recycle old elements
    const oldImageId = parseInt(imageElement.dataset.imageId);
    const oldQuoteId = parseInt(card.dataset.quoteId);

    // Return image to pool
    const imageIndex = activeImages.indexOf(oldImageId);
    if (imageIndex > -1) {
      activeImages.splice(imageIndex, 1);
      inactiveImages.push(oldImageId);
    }

    // Return quote to pool
    const quoteIndex = activeQuotes.indexOf(oldQuoteId);
    if (quoteIndex > -1) {
      activeQuotes.splice(quoteIndex, 1);
      inactiveQuotes.push(oldQuoteId);
    }

    // Get new elements
    const newImage = getRandomImage();
    const newQuote = getRandomQuote();

    // Update card display
    imageElement.src = newImage.path;
    imageElement.dataset.imageId = newImage.id;
    quoteElement.textContent = newQuote.quote;
    authorElement.textContent = `— ${newQuote.author}`;
    card.dataset.quoteId = newQuote.id;
  }
}

function initializeApp() {
  resetState();
  const numCards = parseInt(document.getElementById('cardCount').value);
  const maxAllowed = Math.min(6, imagesData.length, responses.length);

  if (numCards > maxAllowed || numCards < 1) {
    alert(`Please choose between 1 and ${maxAllowed} cards.`);
    return;
  }

  // Update UI state
  document.querySelector('.welcome-container').classList.add('hidden');
  document.querySelector('.js-quote-container').classList.remove('hidden');
  document.querySelector('.back-button').classList.remove('hidden');

  // Render cards
  renderCards(numCards);

  // Add regeneration listener
  document.querySelector('.js-quote-container').addEventListener('click', handleRegeneration);
}

function resetToWelcome() {
  document.querySelector('.js-quote-container').classList.add('hidden');
  document.querySelector('.welcome-container').classList.remove('hidden');
  document.querySelector('.back-button').classList.add('hidden');
  resetState();
}

// ========== Initial Setup ==========
document.addEventListener('DOMContentLoaded', () => {
  // Initialize state
  resetState();

  // Start button handler
  document.querySelector('.start-button').addEventListener('click', initializeApp);

  // Back button handler
  document.querySelector('.back-button').addEventListener('click', resetToWelcome);
});