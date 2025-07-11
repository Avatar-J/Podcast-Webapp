import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TitleCasePipe, DatePipe, CommonModule } from '@angular/common';
import { SingleConfessionResponse } from '../../../Models/ApiResponse';

@Component({
  selector: 'app-confession-card',
  imports: [CommonModule],
  templateUrl: './confession-card.component.html',
  styleUrl: './confession-card.component.scss',
})
export class ConfessionCardComponent {
  @Input() confession: any;
  @Output() approvalChange = new EventEmitter<{
    id: number;
    isApproved: boolean;
  }>();

  onApprove() {
    this.confession.data.is_approved = true;
    this.approvalChange.emit({
      id: this.confession.data.id,
      isApproved: true,
    });
  }

  onDisapprove() {
    this.confession.data.is_approved = false;
    this.approvalChange.emit({
      id: this.confession.data.id,
      isApproved: false,
    });
  }
}
