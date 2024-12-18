import { Component } from '@angular/core';
import { HomepageHeaderComponent } from '../homepage-header/homepage-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HomepageHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
