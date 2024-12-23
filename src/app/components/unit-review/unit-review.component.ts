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
import { Observable, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-unit-review',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './unit-review.component.html',
  styleUrl: './unit-review.component.css',
})
export class UnitReviewComponent implements OnInit {
  unitId!: string;
  unit$!: Observable<UnitDetailInterface>; // Observable for unit details
  reviews$!: Observable<GetReviewInterface[]>; // Observable for reviews
  reviewForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private unitsService: UnitsService,
    private reviewService: ReviewService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      reviewContent: ['', Validators.required],
      reviewScore: [
        '',
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
    });
  }

  ngOnInit(): void {
    // Get the unitId from the route parameters
    this.unitId = this.route.snapshot.paramMap.get('id')!;

    // Fetch the unit details and reviews based on the unitId
    this.unit$ = this.unitsService.getUnitById(this.unitId);
    this.reviews$ = this.unitsService
      .getUnitById(this.unitId)
      .pipe(
        switchMap((unit) =>
          this.reviewService.getReviewsByUnitId(unit.id.toString())
        )
      );
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      this.reviewService
        .createReview(
          this.unitId,
          this.reviewForm.controls['reviewContent'].value,
          this.reviewForm.controls['reviewScore'].value
        )
        .subscribe(() => {
          // Optionally, refetch reviews after submitting a new one (or optimistically update the UI)
          this.reviews$ = this.unitsService
            .getUnitById(this.unitId)
            .pipe(
              switchMap((unit) =>
                this.reviewService.getReviewsByUnitId(unit.id.toString())
              )
            );
        });
      this.reviewForm.reset();
    }
  }
}
