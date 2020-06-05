import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromMarket from '../state/market.reducer';

@Component({
  selector: 'alt-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveStatusComponent implements OnInit {
  @Input() caption: string;
  live: boolean = false;
  recCode: number;

  constructor(private store: Store<fromMarket.State>) {
  }

  ngOnInit(): void {
    this.store.pipe(select(fromMarket.getLiveStatus)).subscribe(live => this.live = live);
    this.store.pipe(select(fromMarket.getCurrentCode)).subscribe(code => this.recCode = code);
  }

  getLiveStatusClass(): any {
    return this.live ? ['live-dot'] : ['notlive-dot'];
  }

}
