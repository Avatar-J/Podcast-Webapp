import { Component } from '@angular/core';

@Component({
  selector: 'app-confessions-list',
  imports: [],
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
