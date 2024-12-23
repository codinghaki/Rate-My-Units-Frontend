import { GetReviewInterface } from './get-review.interface';

export interface UnitDetailInterface {
  id: number;
  code: string;
  name: string;
  reviews: GetReviewInterface[];
}
