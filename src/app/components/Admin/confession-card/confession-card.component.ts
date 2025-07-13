import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminConfession } from '../../../Models/confession';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confession-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    DatePipe,
    MatButtonModule,
  ],
  templateUrl: './confession-card.component.html',
  styleUrl: './confession-card.component.scss',
})
export class ConfessionCardComponent {
  @Input() confession!: AdminConfession;
  @Input() showActions = false;
  @Output() approve = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();

  get approvalStatus(): string {
    return this.confession.is_approved ? 'Approved' : 'Pending';
  }

  get approvalColor(): string {
    return this.confession.is_approved ? 'primary' : 'warn';
  }

  onApprove(): void {
    this.approve.emit();
  }

  onReject(): void {
    this.reject.emit();
  }
}
