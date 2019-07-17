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
import { sharedPrimengModule } from '../shared/shared-primeng.module';
import {TableModule} from 'primeng/table';
import {NgxPaginationModule} from 'ngx-pagination';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';

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
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ["places"]
    }),
    MatTableModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    sharedPrimengModule,
    TableModule,
    NgxPaginationModule,
    MatGoogleMapsAutocompleteModule,
    ToastModule
  ],
  // providers:[MessageService]
})
export class MastersModule { }
