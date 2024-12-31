import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../models/user.interface";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.http.post<UserInterface>('http://localhost:5254/api/account/register',
      this.form.getRawValue()).subscribe(response => {
        console.log("response", response);
        localStorage.setItem('token', response.token);
        const user: UserInterface = response;
        this.authService.currentUserSignal.set(user);
        this.router.navigate(['/']);
    })
  }
}
