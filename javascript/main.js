import { imagesData } from "../data/imagesData.js";
import { responses } from "../data/responses.js";
import { resetState } from './utils.js';
import { handleNavigation } from './components/header.js';
import { handleGenerateCards, handleRegenerateQuote } from './components/card-grid.js';
import { handleSubmitQuote } from './components/quote-submit.js';
import { handleDeleteQuote, renderPendingQuotes } from './components/pending-quotes.js';



const initializeApp = () => {
  resetState(imagesData, responses);
  renderPendingQuotes();

  // Event Listeners
  document.querySelector('[data-action="generate-cards"]').addEventListener('click', handleGenerateCards);
  document.querySelector('[data-component="card-grid"]').addEventListener('click', handleRegenerateQuote);
  document.querySelector('[data-component="quote-form"]').addEventListener('submit', handleSubmitQuote);
  document.querySelector('[data-component="pending-quotes-list"]').addEventListener('click', handleDeleteQuote);
  document.querySelector('[data-component="header"]').addEventListener('click', handleNavigation);
};

document.addEventListener('DOMContentLoaded', initializeApp);