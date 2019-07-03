import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubdivisionComponent } from './subdivision/subdivision.component';
import { CircleComponent } from './circle/circle.component';
import { PolicestationComponent } from './policestation/policestation.component';
import { MandalComponent } from './mandal/mandal.component';
import { VillageComponent } from './village/village.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material';
import {DemoMaterialModule} from '../material.module';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
export const masterRoutes:Routes = [
  {path:'subdivision',component:SubdivisionComponent},
  {path:'circle',component:CircleComponent},
  {path:'policestation',component:PolicestationComponent},
  {path:'mandal',component:MandalComponent},
  {path:'village',component:VillageComponent}
]

@NgModule({
  declarations: [SubdivisionComponent,
  CircleComponent, 
  PolicestationComponent,
  MandalComponent,
  VillageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(masterRoutes),
    MatTableModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MastersModule { }
