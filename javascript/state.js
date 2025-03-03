export const state = {
  activeImages: [],
  inactiveImages: [],
  activeQuotes: [],
  inactiveQuotes: [],
  pendingQuotes: JSON.parse(localStorage.getItem("pendingQuotes")) || [],
  currentView: "welcome",
  previousView: null,     // Previous view (to track where we came from)
};