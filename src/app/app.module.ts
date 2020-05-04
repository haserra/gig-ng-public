import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';
import { GridComponent } from './grid/grid.component';
import { LiveStatusComponent } from './live/live.component';
import { PageNotfoundComponent } from './errors/page-notfound.component';


/* NgRx */

import { StoreModule } from '@ngrx/store';
import { reducer } from './state/market.reducer'
import { StoreDevtoolsModule, StoreDevtools } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GeneratorComponent,
    PaymentsComponent,
    PageNotfoundComponent,
    LiveStatusComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ marketReducer: reducer }),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App Devtools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
