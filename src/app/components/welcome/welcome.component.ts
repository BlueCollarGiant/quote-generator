import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [FormsModule]
})
export class WelcomeComponent {
  @Output() generateCards = new EventEmitter<number>();
  count = 3;
  generate() { this.generateCards.emit(this.count); }
}

