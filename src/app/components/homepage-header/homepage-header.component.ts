import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './homepage-header.component.html',
  styleUrl: './homepage-header.component.css',
})
export class HomepageHeaderComponent {
  logout(): void {
    console.log('Logout');
  }
}
