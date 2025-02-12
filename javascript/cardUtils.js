import { responses } from "../data/responses.js";

export function generateCard(quote) {
    return `
      <div class="card">
        <img src="css/images/1.png" />
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