import { Component } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { HeaderComponent } from '../../components/public/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {}
