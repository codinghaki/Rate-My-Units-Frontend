import {Component, inject, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../../models/user.interface";

@Component({
  selector: 'app-homepage-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './homepage-header.component.html',
  styleUrl: './homepage-header.component.css',
})
export class HomepageHeaderComponent implements OnInit{
  authService = inject(AuthService)
  http = inject(HttpClient)

  ngOnInit() {
    this.http.get<UserInterface>("http://localhost:5254/api/account").subscribe(response => {
      console.log('response', response);
    })
  }

  logout(): void {
    console.log('Logout');
  }

}
