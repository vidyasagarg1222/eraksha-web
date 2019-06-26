import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const authRoutes:Routes = [
   {path:'',component:AuthComponent,children:[
       {path:'dashboard',loadChildren:'../dashboard/dashboard.module#DashboardModule'},
       {path:'masters',loadChildren:'./masters/masters.module#MastersModule'}
   ]} 
]