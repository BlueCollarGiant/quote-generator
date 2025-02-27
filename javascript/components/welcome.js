import { handleGenerateCards } from './card-grid.js';

export const initializeWelcome = () => {
    document.querySelector('[data-action="generate-cards"]').addEventListener('click', handleGenerateCards);
};