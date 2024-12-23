import { Component, OnInit } from '@angular/core';
import { UnitInterface } from '../../models/unit.interface';
import { GetReviewInterface } from '../../models/get-review.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UnitsService } from '../../services/units.service';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UnitDetailInterface } from '../../models/unit-detail.interface';

@Component({
  selector: 'app-unit-review',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './unit-review.component.html',
  styleUrl: './unit-review.component.css',
})
export class UnitReviewComponent implements OnInit {
  unitId!: string;
  unit?: UnitDetailInterface;
  reviews: GetReviewInterface[] = [];
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private unitsService: UnitsService,
    private reviewService: ReviewService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      reviewContent: ['', Validators.required],
      reviewScore: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.unitId = this.route.snapshot.paramMap.get('id')!;
    this.fetchUnitDetails();
  }

  fetchUnitDetails(): void {
    this.unitsService.getUnitById(this.unitId).subscribe((unit) => {
      this.unit = unit;
      this.reviews = unit.reviews || [];
    });
  }

  fetchReviews(): void {
    this.reviewService
      .getReviewsByUnitId(this.unitId)
      .subscribe((reviews) => (this.reviews = reviews));
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      this.reviewService.createReview(
        this.unitId,
        this.reviewForm.controls['reviewContent'].value,
        this.reviewForm.controls['reviewScore'].value
      );
      this.fetchReviews();
      this.reviewForm.reset();
    }
  }
}
