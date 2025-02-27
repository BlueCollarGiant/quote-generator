import { state } from '../state.js';
import { saveToLocalStorage } from '../utils.js';

export const renderPendingQuotes = () => {
  const container = document.querySelector('[data-component="pending-quotes-list"]');
  container.innerHTML = state.pendingQuotes.map(quote => `
    <div data-component="pending-quote" data-id="${quote.id}">
      <p class="quote">"${quote.quote}"</p>
      <p class="author">— ${quote.author}</p>
      <button class="button button--danger" data-action="delete-quote">Delete</button>
    </div>
  `).join('');
};

export const handleDeleteQuote = (event) => {
  if (event.target.dataset.action === 'delete-quote') {
    const quoteId = Number(event.target.closest('[data-component="pending-quote"]').dataset.id);
    state.pendingQuotes = state.pendingQuotes.filter(pendingQuote => pendingQuote.id !== quoteId);
    saveToLocalStorage('pendingQuotes', state.pendingQuotes);
    renderPendingQuotes();
  }
};