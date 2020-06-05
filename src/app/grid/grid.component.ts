import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alt-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() live: boolean;
  @Input() grid: Array<Array<string>>;
  @Input() empty: string[];

  constructor() {
  }

  ngOnInit() {
  }

}
