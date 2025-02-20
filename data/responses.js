class Quote {
    constructor(id, author, quote) {
        this.id = id;
        this.author = author;
        this.quote = quote;
    }

    // for future development and if i need to format quotes
    display() {
        return `${this.quote} - ${this.author}`;
    }
}


const rawQuotes = [
    {id:1, author:"Oscar Wilde", quote:"Be yourself; everyone else is already taken."},
    {id:2, author:"Oscar Wilde", quote:"To live is the rarest thing in the world. Most people exist, that is all."},
    {id:3, author:"Mahatma Gandhi", quote:"Be the change that you wish to see in the world."},
    {id:4, author:"Eleanor Roosevelt", quote:"Do what you feel in your heart to be right - for you'll be criticized anyway."},
    {id:5, author:"Eleanor Roosevelt", quote:"Do one thing every day that scares you."},
    {id:6, author:"Martin Luther King", quote:"Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate; only love can do that."},
    {id:7, author:"Martin Luther King", quote:"Injustice anywhere is a threat to justice everywhere."},
    {id:8, author:"Albert Einstein", quote:"Weak people revenge. Strong people forgive. Intelligent People Ignore."},
    {id:9, author:"Thomas A. Edison", quote:"Genius is one percent inspiration and ninety-nine percent perspiration."},
    {id:10, author:"Thomas A. Edison", quote:"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time."},
    {id:11, author:"George Bernard Shaw", quote:"Life isn't about finding yourself. Life is about creating yourself."},
    {id:12, author:"Winston Churchill", quote:"Success is not final, failure is not fatal: it is the courage to continue that counts."},
    {id:13, author:"Mother Teresa", quote:"Peace begins with a smile."},
    {id:14, author:"Mother Teresa", quote:"If you can't feed a hundred people, then feed just one."},
    {id:15, author:"Francis of Assisi", quote:"All the darkness in the world cannot extinguish the light of a single candle."},
    {id:16, author:"Francis of Assisi", quote:"A single sunbeam is enough to drive away many shadows."}
];

export const responses = rawQuotes.map(quote => new Quote(quote.id, quote.author, quote.quote));