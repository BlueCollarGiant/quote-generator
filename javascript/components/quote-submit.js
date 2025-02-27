import { state } from '../state.js';
import { saveToLocalStorage } from '../utils.js';
import { renderPendingQuotes } from '../components/pending-quotes.js';

export const handleSubmitQuote = (event) => {
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