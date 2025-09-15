import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { CardGridComponent } from '../card-grid/card-grid.component';
import { QuoteSubmitComponent } from '../quote-submit/quote-submit.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, WelcomeComponent, CardGridComponent, QuoteSubmitComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly state = inject(StateService);
  view = computed(() => this.state.currentView());
  count = 3;

  onGenerate(n: number) {
    this.count = n;
    this.state.setView('card-grid');
  }
}
