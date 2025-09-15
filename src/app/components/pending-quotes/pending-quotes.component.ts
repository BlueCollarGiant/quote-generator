import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-pending-quotes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pending-quotes.component.html'
})
export class PendingQuotesComponent {
  readonly state = inject(StateService);
  delete(id: number) { this.state.deletePendingQuote(id); }
}
