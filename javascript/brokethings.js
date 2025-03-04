/*this file is my most current stable this is incase i broke everything 
and need to test things again i will add to it as i build and test*/


import { imagesData } from "../data/imagesData.js";
import { responses } from "../data/responses.js";

// this is me setting up the max number of cards 
const MAX_CARDS = 6;

//this is my state section for tracking
const state = {
  activeImages: [],
  inactiveImages: [],
  activeQuotes: [],
  inactiveQuotes: [],
  pendingQuotes: JSON.parse(localStorage.getItem('pendingQuotes')) || [],// parse local storage back to js-script if nothing there blank array
  currentView: 'welcome', // this tells me what page im on
  previousView: null,     // Previous view (to track where we came from)
};

//my functions
const resetState = () => {
  state.activeImages = [];
  state.inactiveImages = imagesData.map(img => img.id);
  state.activeQuotes = [];
  state.inactiveQuotes = responses.map(quote => quote.id);
  console.log("State Reset - Inactive Images:", state.inactiveImages);
  console.log("State Reset - Active Images:", state.activeImages);
};

const getRandomItem = (dataArray, inactivePool, activePool) => {
  if (inactivePool.length === 0) {
    throw new Error("No inactive items available!");
  }
  const randomIndex = Math.floor(Math.random() * inactivePool.length);
  const selectedId = inactivePool.splice(randomIndex, 1)[0];
  activePool.push(selectedId);
  return dataArray.find(item => item.id === selectedId);
};

const getRandomImage = () => getRandomItem(imagesData, state.inactiveImages, state.activeImages);
const getRandomQuote = () => getRandomItem(responses, state.inactiveQuotes, state.activeQuotes);

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};


// this is my DOM stuff 
const renderCards = (numCards) => {
  const cardsHTML = Array.from({ length: numCards }, () => {
    const randomQuote = getRandomQuote();
    const randomImage = getRandomImage();
    return `
      <div data-component="card" data-quote-id="${randomQuote.id}">
        <img src="${randomImage.path}" data-image-id="${randomImage.id}" />
        <p class="card__quote">${randomQuote.quote}</p>
        <p class="card__author">— ${randomQuote.author}</p>
        <button class="button button--gradient" data-action="regenerate-quote">Get a New Quote</button>
      </div>
    `;
  }).join('');

  document.querySelector('[data-component="card-grid"] .card-grid__container').innerHTML = cardsHTML;
  console.log("Cards Rendered - Active Images:", state.activeImages);
  console.log("Cards Rendered - Inactive Images:", state.inactiveImages);
};

const renderPendingQuotes = () => {
  const container = document.querySelector('[data-component="pending-quotes-list"]');
  container.innerHTML = state.pendingQuotes.map(quote => `
    <div data-component="pending-quote" data-id="${quote.id}">
      <p class="quote">"${quote.quote}"</p>
      <p class="author">— ${quote.author}</p>
      <button class="button button--danger" data-action="delete-quote">Delete</button>
    </div>
  `).join('');
};

const toggleView = (view) => {
  const views = ['welcome', 'card-grid', 'quote-submit'];
  views.forEach(existingView => {
    const element = document.querySelector(`[data-component="${existingView}"]`);
    if (element) {
      element.setAttribute('data-visible', existingView === view);
    } else {
      console.error(`Element with data-component="${existingView}" not found.`);
    }
  });

  // Toggle header buttons
  const backButton = document.querySelector('[data-action="go-back"]');
  const submitButton = document.querySelector('[data-action="open-submit"]');
  const exitButton = document.querySelector('[data-action="close-submit"]');

  if (backButton) backButton.setAttribute('data-visible', view !== 'welcome');
  if (submitButton) submitButton.setAttribute('data-visible', view !== 'quote-submit');
  if (exitButton) exitButton.setAttribute('data-visible', view === 'quote-submit');
};

// event handlers for my stuff
const handleGenerateCards = () => {
  resetState();
  const numCards = parseInt(document.getElementById('cardCount').value);
  const maxAllowed = Math.min(MAX_CARDS, imagesData.length, responses.length);

  if (numCards > maxAllowed || numCards < 1) {
    alert(`Please choose between 1 and ${maxAllowed} cards.`);
    return;
  }

  state.currentView = 'card-grid';
  toggleView('card-grid');
  renderCards(numCards);
};

const handleRegenerateQuote = (event) => {
  if (event.target.dataset.action === 'regenerate-quote') {
    const card = event.target.closest('[data-component="card"]');
    const quoteElement = card.querySelector('.card__quote');
    const authorElement = card.querySelector('.card__author');
    const imageElement = card.querySelector('img');

    // Recycle old elements
    const oldImageId = parseInt(imageElement.dataset.imageId);
    const oldQuoteId = parseInt(card.dataset.quoteId);

    // Toss image back into pool
    const imageIndex = state.activeImages.indexOf(oldImageId);
    if (imageIndex > -1) {
      state.activeImages.splice(imageIndex, 1);
      state.inactiveImages.push(oldImageId);
    }

    // Toss quote back into pool
    const quoteIndex = state.activeQuotes.indexOf(oldQuoteId);
    if (quoteIndex > -1) {
      state.activeQuotes.splice(quoteIndex, 1);
      state.inactiveQuotes.push(oldQuoteId);
    }

    // Get new image and quote
    const newImage = getRandomImage();
    const newQuote = getRandomQuote();

    // Update card display
    imageElement.src = newImage.path;
    imageElement.dataset.imageId = newImage.id;
    quoteElement.textContent = newQuote.quote;
    authorElement.textContent = `— ${newQuote.author}`;
    card.dataset.quoteId = newQuote.id;

    console.log("Quote Regenerated - Active Images:", state.activeImages);
    console.log("Quote Regenerated - Inactive Images:", state.inactiveImages);
  }
};

const handleSubmitQuote = (event) => {
  event.preventDefault();
  const quoteText = document.querySelector('[data-input="quote-text"]').value.trim();
  const quoteAuthor = document.querySelector('[data-input="quote-author"]').value.trim();

  if (!quoteText || !quoteAuthor) {
    alert('Please fill in both fields.');
    return;
  }

  state.pendingQuotes.push({
    id: Date.now(),
    quote: quoteText,
    author: quoteAuthor,
  });
  saveToLocalStorage('pendingQuotes', state.pendingQuotes);
  renderPendingQuotes();
  event.target.reset();
};

const handleDeleteQuote = (event) => {
  if (event.target.dataset.action === 'delete-quote') {
    const quoteId = Number(event.target.closest('[data-component="pending-quote"]').dataset.id);
    state.pendingQuotes = state.pendingQuotes.filter(pendingQuote => pendingQuote.id !== quoteId);
    saveToLocalStorage('pendingQuotes', state.pendingQuotes);
    renderPendingQuotes();
  }
};

const handleNavigation = (event) => {
  const action = event.target.dataset.action;
  if (action === 'open-submit') {
    state.previousView = state.currentView;
    state.currentView = 'quote-submit';
    toggleView('quote-submit');
  } else if (action === 'close-submit') {
    // Handle "Back to Start" button
    if (state.currentView === 'quote-submit') {
      state.currentView = state.previousView || 'welcome'; // Fallback to 'welcome' if no previous view
    } else if (state.currentView === 'card-grid') {
      state.currentView = 'welcome'; // Go back to welcome from card grid
    }
    toggleView(state.currentView);
  } else if (action === 'go-back') {
    // Handle "Back to Start" button
    state.currentView = 'welcome'; // Always go back to welcome
    toggleView('welcome');
  }
};

// start my app
const initializeApp = () => {
  resetState();
  renderPendingQuotes();

  // Event Listeners
  document.querySelector('[data-action="generate-cards"]').addEventListener('click', handleGenerateCards);
  document.querySelector('[data-component="card-grid"]').addEventListener('click', handleRegenerateQuote);
  document.querySelector('[data-component="quote-form"]').addEventListener('submit', handleSubmitQuote);
  document.querySelector('[data-component="pending-quotes-list"]').addEventListener('click', handleDeleteQuote);
  document.querySelector('[data-component="header"]').addEventListener('click', handleNavigation);
};

document.addEventListener('DOMContentLoaded', initializeApp);
