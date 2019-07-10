import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleAlertComponent } from './vehicle-alert/vehicle-alert.component';
import {Routes,RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {sharedPrimengModule} from '../shared/shared-primeng.module';
import { DemoMaterialModule } from '../material.module';
export const reportRoutes:Routes = [
{path:'vehicleAlertsReport',component:VehicleAlertComponent}
]
@NgModule({
  declarations: [VehicleAlertComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(reportRoutes),
    FormsModule,
    BsDatepickerModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    sharedPrimengModule,
    DemoMaterialModule,
  ]
})
export class ReportsModule { }
