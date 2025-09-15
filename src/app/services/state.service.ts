import { Injectable, signal } from '@angular/core';
import type { ImageModel } from '../models/image.model';
import type { QuoteModel } from '../models/quote.model';
import { DataService } from './data.service';

type View = 'welcome' | 'card-grid' | 'quote-submit';

@Injectable({ providedIn: 'root' })
export class StateService {
  // View state
  readonly currentView = signal<View>('welcome');
  previousView: View | null = null;

  // Pools
  activeImages: number[] = [];
  inactiveImages: number[] = [];
  activeQuotes: number[] = [];
  inactiveQuotes: number[] = [];

  // Pending quotes (persisted)
  pendingQuotes: QuoteModel[] = this.loadFromLocalStorage('pendingQuotes') || [];

  constructor(private data: DataService) {}

  resetState(): void {
    this.activeImages = [];
    this.inactiveImages = this.data.imagesData.map((img) => img.id);
    this.activeQuotes = [];
    this.inactiveQuotes = this.data.responses.map((q) => q.id);
  }

  private getRandomItem<T extends { id: number }>(
    dataArray: T[],
    inactivePool: number[],
    activePool: number[]
  ): T {
    if (inactivePool.length === 0) {
      throw new Error('No inactive items available!');
    }
    const randomIndex = Math.floor(Math.random() * inactivePool.length);
    const selectedId = inactivePool.splice(randomIndex, 1)[0];
    activePool.push(selectedId);
    const found = dataArray.find((item) => item.id === selectedId);
    if (!found) throw new Error('Selected item not found');
    return found;
  }

  getRandomImage(): ImageModel {
    return this.getRandomItem(this.data.imagesData, this.inactiveImages, this.activeImages);
  }

  getRandomQuote(): QuoteModel {
    return this.getRandomItem(this.data.responses, this.inactiveQuotes, this.activeQuotes);
  }

  setView(next: View): void {
    if (next === 'quote-submit') {
      this.previousView = this.currentView();
    }
    this.currentView.set(next);
  }

  addPendingQuote(quote: QuoteModel): void {
    this.pendingQuotes.push(quote);
    this.saveToLocalStorage('pendingQuotes', this.pendingQuotes);
  }

  deletePendingQuote(id: number): void {
    this.pendingQuotes = this.pendingQuotes.filter((q) => q.id !== id);
    this.saveToLocalStorage('pendingQuotes', this.pendingQuotes);
  }

  private saveToLocalStorage(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  }

  private loadFromLocalStorage(key: string): any {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : null;
    } catch {
      return null;
    }
  }
}

