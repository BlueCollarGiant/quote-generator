import { imagesData } from "../data/imagesData.js";
import { responses } from "../data/responses.js";

// set max amount of cards 
const MAX_CARDS = 6; 

// set up the state
let state = {
  activeImages: [],
  inactiveImages: [],
  activeQuotes: [],
  inactiveQuotes: [],
};

function resetState() {
  state.activeImages = [];
  state.inactiveImages = imagesData.map(img => img.id);
  state.activeQuotes = [];
  state.inactiveQuotes = responses.map(quote => quote.id);

  console.log("State Reset - Inactive Images:", state.inactiveImages);
  console.log("State Reset - Active Images:", state.activeImages);
}

// all of my Utility Functions 
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
  return getRandomItem(imagesData, state.inactiveImages, state.activeImages);
}

function getRandomQuote() {
  return getRandomItem(responses, state.inactiveQuotes, state.activeQuotes);
}

// push together my DOM Manipulation and Rendering stuff 
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

  console.log("Cards Rendered - Active Images:", state.activeImages);
  console.log("Cards Rendered - Inactive Images:", state.inactiveImages);
}

function toggleUIElements(showWelcome) {
  document.querySelector('.welcome-container').classList.toggle('hidden', !showWelcome);
  document.querySelector('.js-quote-container').classList.toggle('hidden', showWelcome);
  document.querySelector('.back-button').classList.toggle('hidden', showWelcome);
}

// this section handles my Events
function handleRegeneration(event) {
  if (event.target.classList.contains('generate-new-quote')) {
    const card = event.target.closest('.card');
    const quoteElement = card.querySelector('.quote');
    const authorElement = card.querySelector('.author');
    const imageElement = card.querySelector('img');

    // Recycle old elements
    const oldImageId = parseInt(imageElement.dataset.imageId);
    const oldQuoteId = parseInt(card.dataset.quoteId);

    // toss image back into pool
    const imageIndex = state.activeImages.indexOf(oldImageId);
    if (imageIndex > -1) {
      state.activeImages.splice(imageIndex, 1);
      state.inactiveImages.push(oldImageId);
    }

    // toss quote back into pool
    const quoteIndex = state.activeQuotes.indexOf(oldQuoteId);
    if (quoteIndex > -1) {
      state.activeQuotes.splice(quoteIndex, 1);
      state.inactiveQuotes.push(oldQuoteId);
    }

    // Get new images and Quotes
    const newImage = getRandomImage();
    const newQuote = getRandomQuote();

    // Update card display
    imageElement.src = newImage.path;
    imageElement.dataset.imageId = newImage.id;
    quoteElement.textContent = newQuote.quote;
    authorElement.textContent = `— ${newQuote.author}`;
    card.dataset.quoteId = newQuote.id;

    console.log("Quote Regenerated - Active Images:", state.activeImages); // added console log to see whats active on images
    console.log("Quote Regenerated - Inactive Images:", state.inactiveImages); // added console log to test to see whats not active
  }
}

function handleGenerateCards() {
  resetState();
  const numCards = parseInt(document.getElementById('cardCount').value);
  const maxAllowed = Math.min(MAX_CARDS, imagesData.length, responses.length);

  if (numCards > maxAllowed || numCards < 1) {
    alert(`Please choose between 1 and ${maxAllowed} cards.`);
    return;
  }

  toggleUIElements(false); //  hides the welcome page
  renderCards(numCards);
}

function handleBackToStart() {
  toggleUIElements(true); // hides the cards page
  resetState();
}

// get the app ready
function initializeApp() {
  resetState();

  // my event listeners
  document.querySelector('.start-button').addEventListener('click', handleGenerateCards);
  document.querySelector('.back-button').addEventListener('click', handleBackToStart);
  document.querySelector('.js-quote-container').addEventListener('click', handleRegeneration);
}

// this starts the app don't touch
document.addEventListener('DOMContentLoaded', initializeApp);