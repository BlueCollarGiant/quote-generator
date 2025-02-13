import { responses } from "../data/responses.js";
import {imagesData} from "../data/imagesData.js";

export function generateCard(quote, image) {
    return `
      <div class="card">
        <img src="${image}" />
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

export const getRandomImage = () => {
  const randomImageIndex = Math.floor(Math.random() * imagesData.length);
  return imagesData[randomImageIndex];
}