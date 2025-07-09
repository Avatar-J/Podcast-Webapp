import { Component, Input } from '@angular/core';
import { TitleCasePipe, DatePipe, CommonModule } from '@angular/common';
import { SingleConfessionResponse } from '../../../Models/ApiResponse';

@Component({
  selector: 'app-confession-card',
  imports: [CommonModule],
  templateUrl: './confession-card.component.html',
  styleUrl: './confession-card.component.scss',
})
export class ConfessionCardComponent {
  @Input() confession!: SingleConfessionResponse;
}
