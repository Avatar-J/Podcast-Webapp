import { Component } from '@angular/core';
import { ConfessionCardComponent } from '../../../components/Admin/confession-card/confession-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confessions-list',
  imports: [ConfessionCardComponent, CommonModule],
  templateUrl: './confessions-list.component.html',
  styleUrl: './confessions-list.component.scss',
})
export class ConfessionsListComponent {
  protected confessions = [
    {
      status: 'approved',
      data: {
        id: 1,
        content: 'I am a confession',
        is_approved: true,
      },
    },
    {
      status: 'approved',
      data: {
        id: 2,
        content: 'I am a confession',
        is_approved: true,
      },
    },
  ];

  onConfessionApprovalChange(event: { id: number; isApproved: boolean }) {
    // Update your data store or make API call
    console.log(
      `Confession ${event.id} approval status changed to ${event.isApproved}`
    );
  }
}
