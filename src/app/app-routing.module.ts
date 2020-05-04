import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';
import { PageNotfoundComponent } from './errors/page-notfound.component';


const routes: Routes = [
  {
    path: 'generator',
    component: GeneratorComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: '',
    redirectTo: '/generator',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
