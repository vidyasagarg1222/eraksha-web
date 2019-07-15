import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveviewComponent } from './liveview/liveview.component';
import {Routes,RouterModule} from '@angular/router';
import { sharedPrimengModule } from '../shared/shared-primeng.module';
import { DemoMaterialModule } from '../material.module';
import { AgmCoreModule } from '@agm/core';

export const vehicleRoutes:Routes = [
  {path:'liveview',component:LiveviewComponent}
]
@NgModule({
  declarations: [LiveviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(vehicleRoutes),
    sharedPrimengModule,
    DemoMaterialModule,
    AgmCoreModule
  ]
})
export class VehicleModule { }
