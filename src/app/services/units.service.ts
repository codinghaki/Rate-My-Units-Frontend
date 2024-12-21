import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitInterface } from '../models/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  constructor(private http: HttpClient) {}

  getUnits(searchValue: string): Observable<UnitInterface[]> {
    return this.http.get<UnitInterface[]>(
      `http://localhost:5254/api/units?Code=${searchValue}`
    );
  }
}
