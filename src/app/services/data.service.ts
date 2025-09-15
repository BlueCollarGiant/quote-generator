import { Injectable } from '@angular/core';
import type { ImageModel } from '../models/image.model';
import type { QuoteModel } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly imagesData: ImageModel[] = [
    { id: 1, path: 'assets/images/1.png' },
    { id: 2, path: 'assets/images/2.png' },
    { id: 3, path: 'assets/images/3.png' },
    { id: 4, path: 'assets/images/4.png' },
    { id: 5, path: 'assets/images/5.png' },
    { id: 6, path: 'assets/images/6.png' },
    { id: 7, path: 'assets/images/7.png' },
    { id: 8, path: 'assets/images/8.png' },
    { id: 9, path: 'assets/images/9.png' },
    { id: 10, path: 'assets/images/10.png' },
    { id: 11, path: 'assets/images/11.png' },
    { id: 12, path: 'assets/images/12.png' },
    { id: 13, path: 'assets/images/13.png' },
    { id: 14, path: 'assets/images/14.png' },
    { id: 15, path: 'assets/images/15.png' },
  ];

  readonly responses: QuoteModel[] = [
    { id: 1, author: 'Oscar Wilde', quote: 'Be yourself; everyone else is already taken.' },
    { id: 2, author: 'Oscar Wilde', quote: 'To live is the rarest thing in the world. Most people exist, that is all.' },
    { id: 3, author: 'Mahatma Gandhi', quote: 'Be the change that you wish to see in the world.' },
    { id: 4, author: 'Eleanor Roosevelt', quote: "Do what you feel in your heart to be right - for you'll be criticized anyway." },
    { id: 5, author: 'Eleanor Roosevelt', quote: 'Do one thing every day that scares you.' },
    { id: 6, author: 'Martin Luther King', quote: 'Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate; only love can do that.' },
    { id: 7, author: 'Martin Luther King', quote: 'Injustice anywhere is a threat to justice everywhere.' },
    { id: 8, author: 'Albert Einstein', quote: 'Weak people revenge. Strong people forgive. Intelligent People Ignore.' },
    { id: 9, author: 'Thomas A. Edison', quote: 'Genius is one percent inspiration and ninety-nine percent perspiration.' },
    { id: 10, author: 'Thomas A. Edison', quote: 'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.' },
    { id: 11, author: 'George Bernard Shaw', quote: "Life isn't about finding yourself. Life is about creating yourself." },
    { id: 12, author: 'Winston Churchill', quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.' },
    { id: 13, author: 'Mother Teresa', quote: 'Peace begins with a smile.' },
    { id: 14, author: 'Mother Teresa', quote: "If you can't feed a hundred people, then feed just one." },
    { id: 15, author: 'Francis of Assisi', quote: 'All the darkness in the world cannot extinguish the light of a single candle.' },
    { id: 16, author: 'Francis of Assisi', quote: 'A single sunbeam is enough to drive away many shadows.' }
  ];
}

