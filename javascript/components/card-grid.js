import { resetState } from '../utils.js';
import { state } from '../state.js';
import { getRandomImage, getRandomQuote } from '../utils.js';
import { imagesData } from "../../data/imagesData.js";
import { responses } from "../../data/responses.js";
import { toggleView } from '../components/header.js';

// this is me setting up the max number of cards 
const MAX_CARDS = 6;



export const renderCards = (numCards, imagesData, responses) => {
  const cardsHTML = Array.from({ length: numCards }, () => {
    const randomQuote = getRandomQuote(responses);
    const randomImage = getRandomImage(imagesData);
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

export const handleGenerateCards = () => {
  resetState(imagesData, responses);
  const numCards = parseInt(document.getElementById('cardCount').value);
  const maxAllowed = Math.min(MAX_CARDS, imagesData.length, responses.length);

  if (numCards > maxAllowed || numCards < 1) {
    alert(`Please choose between 1 and ${maxAllowed} cards.`);
    return;
  }

  state.currentView = 'card-grid';
  toggleView('card-grid');
  renderCards(numCards, imagesData, responses);
};

export const handleRegenerateQuote = (event) => {
  if (event.target.dataset.action === 'regenerate-quote') {
    const card = event.target.closest('[data-component="card"]');
    const quoteElement = card.querySelector('.card__quote');
    const authorElement = card.querySelector('.card__author');
    const imageElement = card.querySelector('img');

    const oldImageId = parseInt(imageElement.dataset.imageId);
    const oldQuoteId = parseInt(card.dataset.quoteId);

    const imageIndex = state.activeImages.indexOf(oldImageId);
    if (imageIndex > -1) {
      state.activeImages.splice(imageIndex, 1);
      state.inactiveImages.push(oldImageId);
    }

    const quoteIndex = state.activeQuotes.indexOf(oldQuoteId);
    if (quoteIndex > -1) {
      state.activeQuotes.splice(quoteIndex, 1);
      state.inactiveQuotes.push(oldQuoteId);
    }

    const newImage = getRandomImage(imagesData);
    const newQuote = getRandomQuote(responses);

    imageElement.src = newImage.path;
    imageElement.dataset.imageId = newImage.id;
    quoteElement.textContent = newQuote.quote;
    authorElement.textContent = `— ${newQuote.author}`;
    card.dataset.quoteId = newQuote.id;

    console.log("Quote Regenerated - Active Images:", state.activeImages);
    console.log("Quote Regenerated - Inactive Images:", state.inactiveImages);
  }
};