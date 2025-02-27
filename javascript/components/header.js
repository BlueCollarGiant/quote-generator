import { state } from "../state.js";

export const handleNavigation = (event) => {
  const action = event.target.dataset.action;
  if (action === "open-submit") {
    state.currentView = "quote-submit";
    toggleView("quote-submit");
  } else if (action === "close-submit" || action === "go-back") {
    if (state.currentView === "quote-submit") {
      state.currentView = "welcome";
    } else if (state.currentView === "card-grid") {
      state.currentView = "welcome";
    }
    toggleView(state.currentView);
  }
}; 

export const toggleView = (view) => {
  const views = ["welcome", "card-grid", "quote-submit"];
  views.forEach((existingView) => {
    const element = document.querySelector(
      `[data-component="${existingView}"]`
    );
    if (element) {
      element.setAttribute("data-visible", existingView === view);
    } else {
      console.error(`Element with data-component="${existingView}" not found.`);
    }
  });

  const backButton = document.querySelector('[data-action="go-back"]');
  const submitButton = document.querySelector('[data-action="open-submit"]');
  const exitButton = document.querySelector('[data-action="close-submit"]');

  if (backButton) backButton.setAttribute("data-visible", view !== "welcome");
  if (submitButton)
    submitButton.setAttribute("data-visible", view !== "quote-submit");
  if (exitButton)
    exitButton.setAttribute("data-visible", view === "quote-submit");
};
