import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../services/units.service';
import { UnitInterface } from '../models/unit.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  searchValue = '';

  units: UnitInterface[] = [];

  searchForm: FormGroup;

  constructor(private unitsService: UnitsService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchValue: '',
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.unitsService.getUnits(this.searchValue).subscribe((units) => {
      this.units = units;
    });
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }
}
