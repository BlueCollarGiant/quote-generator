const responses = [ {
    id: 1,
    author: "Oscar Wilde",
    quote:  "Be yourself; everyone else is already taken.",
    mood: "na",
},
            {
    id: 2,
    author: "Oscar Wilde",
    quote:  "To live is the rarest thing in the world. Most people exist, that is all.",
    mood:  "na",
},
            {
    id: 3,
    author: "Mahatma Gandhi",
    quote:  "Be the change that you wish to see in the world.",
    mood: "na",
},
            {
    id: 4,
    author: "Eleanor Roosevelt",
    quote:  "Do what you feel in your heart to be right - for you'll be criticized anyway.",
    mood: "na",
},
            {
    id: 5,
    author: "Eleanor Roosevelt",
    quote:   "Do one thing every day that scares you.",
    mood: 'na',
},
            {
    id: 6,
    author: "Martin Luther King",
    quote:  "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate; only love can do that.",
    mood: 'na',
},
            {
    id: 7,
    author: "Martin Luther King",
    quote:  "Injustice anywhere is a threat to justice everywhere.",
    mood: 'na',
},

            {
    id: 8,
    author: "Albert Einstein",
    quote:  "Weak people revenge. Strong people forgive. Intelligent People Ignore.",
    mood: 'na',
},

            {
    id: 9,
    author: "Thomas A. Edison",
    quote:  "Genius is one percent inspiration and ninety-nine percent perspiration.",
    mood: 'na',
},

            {
    id: 10,
    author: "Thomas A. Edison",
    quote:  "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
    mood: 'na',
},

            {
    id: 11,
    author: "George Bernard Shaw",
    quote:  "Life isn't about finding yourself. Life is about creating yourself.",
    mood: 'na',
},

            {
    id: 12,
    author: "Winston Churchill",
    quote:  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    mood: 'na',
},

            {
    id: 13,
    author: "Mother Teresa",
    quote:  "Peace begins with a smile.",
    mood: 'na',
},

            {
    id: 14,
    author: "Mother Teresa",
    quote:  "If you can't feed a hundred people, then feed just one.",
    mood: 'na',
},

            {
    id: 15,
    author: "Francis of Assisi",
    quote:  "All the darkness in the world cannot extinguish the light of a single candle.",
    mood: 'na',
},

            {
    id: 16,
    author: "Francis of Assisi",
    quote:  "A single sunbeam is enough to drive away many shadows.",
    mood: 'na',
},
]



// setting up data templete
/*{
    id: ,
    author: ,
    quote:  ,
    mood: na,
},*/
// this is my teplate for new quotes



// Function to generate HTML for a single card
function generateCard(quote) {
    return `
      <div class="card">
        <img src="https://plus.unsplash.com/premium_photo-1675701826925-710e336bbba5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <p class="quote">${quote.quote}</p>
        <p class="author">— ${quote.author}</p>
        <button class="generate-new-quote"> Get a New quote</button>
      </div>
    `;
  }
  
  // Function to render the grid with 6 unique cards
  function renderCards() {
    const cardsHTML = Array.from({ length: 6 }, () => {        // idea turn the length munber to variable and let user chose card ammount
      const randomQuote = getRandomQuote();
      return generateCard(randomQuote);
    }).join('');
  
    document.querySelector('.js-quote-container').innerHTML = `
      <div class="grid">${cardsHTML}</div>
    `;
  }
  
  // Function to get a random quote
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }
  
  // Event delegation for button clicks
  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('generate-new-quote')) {
      const card = event.target.closest('.card');
      const quoteElement = card.querySelector('.quote');
      const authorElement = card.querySelector('.author');
  
      const newQuote = getRandomQuote();
      quoteElement.textContent = newQuote.quote;
      authorElement.textContent = `— ${newQuote.author}`;
    }
  });
  
  // Run once when the window loads
  window.onload = () => {
    renderCards();
  };
