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


export const responses = [
    new Quote(1, "Oscar Wilde", "Be yourself; everyone else is already taken."),
    new Quote(2, "Oscar Wilde", "To live is the rarest thing in the world. Most people exist, that is all."),
    new Quote(3, "Mahatma Gandhi", "Be the change that you wish to see in the world."),
    new Quote(4, "Eleanor Roosevelt", "Do what you feel in your heart to be right - for you'll be criticized anyway."),
    new Quote(5, "Eleanor Roosevelt", "Do one thing every day that scares you."),
    new Quote(6, "Martin Luther King", "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate; only love can do that."),
    new Quote(7, "Martin Luther King", "Injustice anywhere is a threat to justice everywhere."),
    new Quote(8, "Albert Einstein", "Weak people revenge. Strong people forgive. Intelligent People Ignore."),
    new Quote(9, "Thomas A. Edison", "Genius is one percent inspiration and ninety-nine percent perspiration."),
    new Quote(10, "Thomas A. Edison", "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time."),
    new Quote(11, "George Bernard Shaw", "Life isn't about finding yourself. Life is about creating yourself."),
    new Quote(12, "Winston Churchill", "Success is not final, failure is not fatal: it is the courage to continue that counts."),
    new Quote(13, "Mother Teresa", "Peace begins with a smile."),
    new Quote(14, "Mother Teresa", "If you can't feed a hundred people, then feed just one."),
    new Quote(15, "Francis of Assisi", "All the darkness in the world cannot extinguish the light of a single candle."),
    new Quote(16, "Francis of Assisi", "A single sunbeam is enough to drive away many shadows.")
];
