import { responses } from "../data/responses.js";

export function generateCard(quote) {
    return `
      <div class="card">
        <img src="https://plus.unsplash.com/premium_photo-1675701826925-710e336bbba5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <p class="quote">${quote.quote}</p>
        <p class="author">— ${quote.author}</p>
        <button class="generate-new-quote cool-button"> Get a New quote</button>
      </div>
    `;
  }


export const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}