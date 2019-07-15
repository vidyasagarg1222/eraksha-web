import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { QuickviewComponent } from './quickview/quickview.component';

export const authRoutes:Routes = [
   {path:'',component:AuthComponent,children:[
       {path:'dashboard',loadChildren:'../dashboard/dashboard.module#DashboardModule'},
       {path:'masters',loadChildren:'../masters/masters.module#MastersModule'},
       {path:'quickview',component:QuickviewComponent},
       {path:'reports',loadChildren:'../reports/reports.module#ReportsModule'},
       {path:'vehicle',loadChildren:'../vehicle/vehicle.module#VehicleModule'}
   ]} 
]