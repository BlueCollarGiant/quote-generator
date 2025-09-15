import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { StateService } from '../../services/state.service';

interface CardVM {
  imageId: number;
  imagePath: string;
  quoteId: number;
  quote: string;
  author: string;
}

@Component({
  selector: 'app-card-grid',
  standalone: true,
  imports: [NgFor],
  templateUrl: './card-grid.component.html'
})
export class CardGridComponent implements OnChanges {
  private readonly state = inject(StateService);
  @Input({ required: true }) count = 3;
  cards: CardVM[] = [];

  ngOnInit() {
    this.initGrid();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['count'] && !changes['count'].firstChange) {
      this.initGrid();
    }
  }

  regenerate(card: CardVM) {
    const img = this.state.getRandomImage();
    const q = this.state.getRandomQuote();
    card.imageId = img.id;
    card.imagePath = img.path;
    card.quoteId = q.id;
    card.quote = q.quote;
    card.author = q.author;
  }

  private newCard(): CardVM {
    const img = this.state.getRandomImage();
    const q = this.state.getRandomQuote();
    return { imageId: img.id, imagePath: img.path, quoteId: q.id, quote: q.quote, author: q.author };
  }

  private initGrid() {
    this.state.resetState();
    const maxAllowed = Math.min(6, this.state.inactiveImages.length, this.state.inactiveQuotes.length);
    const n = Math.max(1, Math.min(this.count, maxAllowed));
    this.cards = Array.from({ length: n }, () => this.newCard());
  }
}
