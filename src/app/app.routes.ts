import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UnitReviewComponent } from './components/unit-review/unit-review.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'unit/:id', component: UnitReviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
