import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {RouterModule} from '@angular/router';
import {authRoutes} from './lazyload.routes';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    UiModule
  ]
})
export class AuthModule { }
