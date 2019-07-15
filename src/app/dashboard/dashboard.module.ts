import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../material.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {FormsModule} from '@angular/forms';
import { ChartModule,HIGHCHARTS_MODULES } from 'angular-highcharts';

export const appRoutes:Routes = [
  {path:'',component:DashboardComponent}
]
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    DemoMaterialModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartModule,
  ],
  providers: [
    // { provide: HIGHCHARTS_MODULES, useFactory: () => [exporting] } // add as factory to your providers
  ]
})
export class DashboardModule { }
