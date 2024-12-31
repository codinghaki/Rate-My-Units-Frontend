import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient, withInterceptors,
} from '@angular/common/http';
import {authIntercepter} from "./auth.intercepter";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    HttpClient,
    provideHttpClient(withInterceptors([authIntercepter])),
  ],
};
