import { Component, Input } from '@angular/core';
import { TeamProfile } from '../../../Models/ApiResponse';

@Component({
  selector: 'app-team-card',
  imports: [],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss',
})
export class TeamCardComponent {
  @Input() teamMember!: TeamProfile;
}
