import { Component, inject } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private readonly state = inject(StateService);

  isWelcome() { return this.state.currentView() === 'welcome'; }
  isQuoteSubmit() { return this.state.currentView() === 'quote-submit'; }

  openSubmit() { this.state.setView('quote-submit'); }
  closeSubmit() { this.state.setView(this.state.previousView ?? 'welcome'); }
  goBack() { this.state.setView('welcome'); }
}
