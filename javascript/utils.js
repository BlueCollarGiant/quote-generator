import { state } from "./state.js";

export const resetState = (imagesData, responses) => {
  state.activeImages = [];
  state.inactiveImages = imagesData.map((img) => img.id);
  state.activeQuotes = [];
  state.inactiveQuotes = responses.map((quote) => quote.id);
  console.log("State Reset - Inactive Images:", state.inactiveImages);
  console.log("State Reset - Active Images:", state.activeImages);
};

export const getRandomItem = (dataArray, inactivePool, activePool) => {
  if (inactivePool.length === 0) {
    throw new Error("No inactive items available!");
  }
  const randomIndex = Math.floor(Math.random() * inactivePool.length);
  const selectedId = inactivePool.splice(randomIndex, 1)[0];
  activePool.push(selectedId);
  return dataArray.find((item) => item.id === selectedId);
};

export const getRandomImage = (imagesData) =>
  getRandomItem(imagesData, state.inactiveImages, state.activeImages);
export const getRandomQuote = (responses) =>
  getRandomItem(responses, state.inactiveQuotes, state.activeQuotes);

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
