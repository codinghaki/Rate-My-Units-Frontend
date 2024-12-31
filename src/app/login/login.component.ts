import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserInterface} from "../models/user.interface";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.http.post<UserInterface>('http://localhost:5254/api/account/login',
      this.form.getRawValue()).subscribe(response => {
      console.log("response", response);
      localStorage.setItem('token', response.token);
      const user: UserInterface = response;
      this.authService.currentUserSignal.set(user);
      this.router.navigate(['/']);
    })
  }
}
