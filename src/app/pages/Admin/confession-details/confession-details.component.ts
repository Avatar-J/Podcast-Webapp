import { Component } from '@angular/core';
import { ConfessionCardComponent } from '../../../components/Admin/confession-card/confession-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confession-details',
  imports: [ConfessionCardComponent, CommonModule],
  templateUrl: './confession-details.component.html',
  styleUrl: './confession-details.component.scss',
})
export class ConfessionDetailsComponent {}
