import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetReviewInterface } from '../models/get-review.interface';
import { PostReviewInterface } from '../models/post-review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviewsByUnitId(unitId: string): Observable<GetReviewInterface[]> {
    return this.http.get<GetReviewInterface[]>(
      `http://localhost:5254/api/reviews/${unitId}`
    );
  }

  createReview(
    unitId: string,
    reviewContent: string,
    reviewScore: number
  ): Observable<PostReviewInterface> {
    const review: PostReviewInterface = {
      content: reviewContent,
      score: reviewScore,
    };

    const url = `http://localhost:5254/api/reviews/${unitId}`;

    return this.http.post<PostReviewInterface>(url, review);
  }
}
