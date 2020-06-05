import { Payment } from '../model/payment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  /**
   * For the purpose of this exercise, the mock API tool (https://www.mockapi.io/) is used to mock an end point for the payments.
   * The resource payments has been created.
   * The contents of the Payment List will be saved to the following  end point:
   */
  private paymentsListUrl = 'https://5eaca9c44bf71e00166a0a3d.mockapi.io/api/horacio-serra/payments';

  constructor(private http: HttpClient) {
  }

  savePayments(payments: Array<Payment>): Observable<Payment[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Payment[]>(this.paymentsListUrl, payments, { headers })
      .pipe(
        tap(data => console.log(`Saved the list of payments ${JSON.stringify(data)}`)),
        catchError(this.handleError)
      )
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
