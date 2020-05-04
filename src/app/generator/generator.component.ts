import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromMarket from '../state/market.reducer';
import * as marketActions from '../state/market.actions';

@Component({
  selector: 'alt-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  liveStatus: boolean;
  currentCode: number;
  empty: string[] = [];
  grid: Array<Array<string>>;
  isDisabled: boolean = false;
  placeholder: string = 'Type a character a-z';
  inputValue: string = null;
  weightLetter: string;
  invalidCharMessage: string = '';
  id: any;

  constructor(private store: Store<fromMarket.State>) {
  }

  ngOnInit(): void {
    /**
     * The Redux pattern, using the NgRx libray,  was chosen to maintain and manage the entire app state.
     *
     * 
     * Start subscribing to the store regarding Live Status panel, new Grid updates and whenever the user hits a character.
     */
    this.store.pipe(select(fromMarket.getLiveStatus)).subscribe(
      live => {
        this.liveStatus = live;
      }
    );

    if (!this.liveStatus) {
      this.emptyGrid();
    } else {
      this.store.pipe(select(fromMarket.getCurrentGrid)).subscribe(grid => this.grid = grid);
      this.store.pipe(select(fromMarket.getWeightConstant)).subscribe(weightConstant => this.weightLetter = weightConstant);
    };
  }

  populateGrid(): void {
    let count = 0;
    let letter = '';
    let grid = [[], [], [], [], [], [], [], [], [], []];
    /**
      * Random alphabetic chars generator.
      */

    if (this.weightLetter) {
      //console.log(`User hit ${this.weightLetter} - fill 20% with it.`);
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
          grid[i][j] = this.weightLetter;
        }
      };
      for (let i = 2; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          count = Math.floor(Math.random() * 26) + 0;
          letter = String.fromCharCode(97 + count)
          grid[i][j] = letter;
        }
      }
    } else {
      //console.log(`No weight has been provided.`)
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          count = Math.floor(Math.random() * 26) + 0;
          letter = String.fromCharCode(97 + count);
          grid[i][j] = letter;
        }
      };
    }

    /**
     * Compute the code
     */
    this.currentCode = this.liveCodeGenerator(grid);
    this.store.dispatch(new marketActions.RefreshGrid(grid));
    this.store.dispatch(new marketActions.UpdateCode(this.currentCode));
  }

  startGenerator(): void {
    if (!this.liveStatus) {
      this.store.dispatch(new marketActions.GoLive(true));
      this.populateGrid();
      this.id = setInterval(() => { this.populateGrid() }, 2000); // Every 2 seconds the grid needs to be refreshed and a different code will be generated.
      this.store.pipe(select(fromMarket.getCurrentGrid)).subscribe(grid => this.grid = grid);
      this.store.pipe(select(fromMarket.getWeightConstant)).subscribe(weightConstant => this.weightLetter = weightConstant);
    } else {
      console.log(`Generator has already been started.`);
    }
  }

  weightConstant(event: any): void {
    let weightLetter: string = null;
    const weight: string = event.target.value;
    const pattern = new RegExp("[a-z]");

    if (pattern.test(weight)) {
      this.isDisabled = true;
      weightLetter = weight;

      this.store.dispatch(new marketActions.UpdateWeightConstant(weightLetter));

      let timerId = setTimeout(() => {
        this.placeholder = "Type a character";
        this.isDisabled = false;
        this.store.dispatch(new marketActions.UpdateWeightConstant(null));
        this.inputValue = null;
      }, 4000);
    } else {
      this.invalidCharMessage = `The character you have entered (${weight}) is wrong.`
      this.inputValue = null;
    }
  }

  emptyGrid(): void {
    for (let i = 0; i < 100; i++) {
      this.empty.push('foo');
    }
  }

  liveCodeGenerator(grid: Array<Array<string>>): number {
    const marketDate: Date = new Date();
    const seconds = marketDate.getSeconds().toString().split("");
    let x, y;
    let matchingGridCellXY, matchingGridCellYX;
    let countXY = 0;
    let countYX = 0;

    if (seconds[0] === undefined && seconds[1] === undefined) {
      x = 0;
      y = 0;
    } else if (seconds[0] !== undefined && seconds[1] === undefined) {
      x = Number(seconds[0]);
      y = 0;
    } else {
      x = Number(seconds[0]);
      y = Number(seconds[1]);
    };

    matchingGridCellXY = grid[x][y];
    matchingGridCellYX = grid[y][x];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (grid[i][j] === matchingGridCellXY) {
          countXY++;
        } else if (grid[i][j] === matchingGridCellYX) {
          countYX++;
        }
      }
    };

    let reducedGridCountXY = this.getReducedGridCellOcurrence(countXY);
    let reducedGridCountYX = this.getReducedGridCellOcurrence(countYX);
    let code = Number("" + reducedGridCountXY + reducedGridCountYX);

    return code;
  }


  getReducedGridCellOcurrence(count: number): number {
    if (count > 9) {
      let divisor = 2;
      let quocient = count / divisor;
      while (quocient > 9) {
        divisor++;
        quocient = count / divisor;
      };
      count = Math.round(quocient);
    };
    return count;
  }


  ngOnDestroy(): void {
    // TODO clearInterval
    /* if (this.id) {
      clearInterval(this.id);
    } */
  }

}