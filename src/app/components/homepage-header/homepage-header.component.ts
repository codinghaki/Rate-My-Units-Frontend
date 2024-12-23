import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './homepage-header.component.html',
  styleUrl: './homepage-header.component.css',
})
export class HomepageHeaderComponent {}
