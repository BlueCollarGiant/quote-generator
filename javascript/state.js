export const state = {
  activeImages: [],
  inactiveImages: [],
  activeQuotes: [],
  inactiveQuotes: [],
  pendingQuotes: JSON.parse(localStorage.getItem("pendingQuotes")) || [],
  currentView: "welcome",
};