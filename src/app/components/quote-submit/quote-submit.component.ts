import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { PendingQuotesComponent } from '../pending-quotes/pending-quotes.component';

@Component({
  selector: 'app-quote-submit',
  standalone: true,
  imports: [FormsModule, PendingQuotesComponent],
  templateUrl: './quote-submit.component.html'
})
export class QuoteSubmitComponent {
  private readonly state = inject(StateService);
  text = '';
  author = '';

  submit() {
    const text = this.text.trim();
    const author = this.author.trim();
    if (!text || !author) return;
    this.state.addPendingQuote({ id: Date.now(), quote: text, author });
    this.text = '';
    this.author = '';
  }
}
