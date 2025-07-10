import { Component } from '@angular/core';
import { ConfessionCardComponent } from '../../../components/Admin/confession-card/confession-card.component';

@Component({
  selector: 'app-confessions-list',
  imports: [ConfessionCardComponent],
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
}
