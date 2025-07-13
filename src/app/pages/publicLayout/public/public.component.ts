import { Component } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { HeaderComponent } from '../../../components/public/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../components/public/footer/footer.component';

@Component({
  selector: 'app-public',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {}
