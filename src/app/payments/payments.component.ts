import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromMarket from '../state/market.reducer';
import * as marketActions from '../state/market.actions';

import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Payment } from '../model/payment';

import { PaymentsService } from '../services/payments.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'alt-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  response: string;
  paymentForm: FormGroup;

  private payment: FormControl;
  private amount: FormControl;

  liveStatus: boolean;
  currentCode: number;
  grid: Array<Array<string>>;

  myPayment: Payment | null;
  paymentsList: Array<Payment>;
  empty: Array<Payment> = [];
  displayGridSnapshot: boolean = false;
  snapShot: Array<Array<string>>;

  constructor(private store: Store<fromMarket.State>, private payService: PaymentsService) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromMarket.getLiveStatus)).subscribe(
      live => {
        this.liveStatus = live;
      }
    );

    /**
     * Start subscribing to the store regarding the Current Code, new Grid updates and the Payment List.
     */
    if (this.liveStatus) {
      this.store.pipe(select(fromMarket.getCurrentGrid)).subscribe(grid => this.grid = grid);
      this.store.pipe(select(fromMarket.getCurrentCode)).subscribe(code => this.currentCode = code);
      this.store.pipe(select(fromMarket.getPaymentsList)).subscribe(payments => this.paymentsList = payments);
    } else {
      this.emptyGridList();
    }

    /**
     * Defines all the form controls and validators.
     */
    this.payment = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*'), Validators.minLength(3), Validators.maxLength(10)]);
    this.amount = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(1), Validators.maxLength(7)]);

    this.paymentForm = new FormGroup({
      payment: this.payment,
      amount: this.amount
    })
  }

  validatePayment(): boolean {
    return this.payment.valid || this.payment.untouched;
  }

  validateAmount(): boolean {
    return this.amount.valid || this.amount.untouched;
  }

  addPayment(): void {
    if (this.paymentForm.valid && this.liveStatus) {
      let currentPayment: Payment = {
        id: 0,
        name: '',
        amount: 0,
        code: 0,
        grid: [[], [], [], [], [], [], [], [], [], []]
      };

      currentPayment.name = this.payment.value;
      currentPayment.amount = this.amount.value;
      currentPayment.code = this.currentCode;
      currentPayment.grid = this.grid;
      this.store.dispatch(new marketActions.AddPayment(currentPayment));
    }
    else {
      console.log(`The payment details are not valid or the market is not alive - Live Status is: ${this.liveStatus}.`);
    }
  }

  displayGridSnapShot(grid: Array<Array<string>>) {
    this.displayGridSnapshot = true;
    this.snapShot = grid;
  }

  savePayments(payments: Array<Payment>): void {
    this.payService.savePayments(payments).subscribe(
      data => {
        this.response = data['message'];
        console.log(`Successfully saved DATA:  ${JSON.stringify(this.response)}`);
      },
      (err: HttpErrorResponse) => {
        this.response = `Cannot add list of Payments. Error Code: ${err.message} ${err.error.message}`
      }
    );
  }

  close(event: any) {
    if (event.target.id === 'payments-modal' || event.target.id === 'close') {
      this.displayGridSnapshot = false;
    } else {
      this.displayGridSnapshot = true;
    }
  }

  emptyGridList(): void {
    for (let i = 0; i < 1; i++) {
      this.empty.push();
    }
  }
}
