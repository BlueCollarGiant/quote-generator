import { responses } from "../data/responses.js";
import { imagesData } from "../data/imagesData.js";
import { usedImages, usedQuotes } from './state.js'; 

export const getRandomImage = () => {
    const availableImages = imagesData.filter(
        (image) => !usedImages.includes(image.path)
    );
    if (availableImages.length === 0) {
        console.warn("No more unique images available. Reusing images.");
        usedImages.length = 0; // Reset used images
        return imagesData[Math.floor(Math.random() * imagesData.length)].path;
    }

    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    usedImages.push(randomImage.path);
    return randomImage.path;
};

export const getRandomQuote = () => {
    const availableQuotes = responses.filter(
        (quote) => !usedQuotes.includes(quote.id)
    );

    if (availableQuotes.length === 0) {
        console.warn("No more unique quotes available. Reusing quotes.");
        usedQuotes.length = 0; // Reset used quotes
        return responses[Math.floor(Math.random() * responses.length)];
    }

    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    usedQuotes.push(randomQuote.id);
    return randomQuote;
};