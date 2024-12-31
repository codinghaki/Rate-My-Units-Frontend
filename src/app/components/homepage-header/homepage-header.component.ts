import {Component, inject, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-homepage-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './homepage-header.component.html',
  styleUrl: './homepage-header.component.css',
})
export class HomepageHeaderComponent implements OnInit{
  authService = inject(AuthService)

  logout(): void {
    console.log('Logout');
  }

  ngOnInit() {
  }
}
