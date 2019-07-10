import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {RouterModule} from '@angular/router';
import {authRoutes} from './lazyload.routes';
import { UiModule } from '../ui/ui.module';
import { QuickviewComponent } from './quickview/quickview.component';
import {sharedPrimengModule} from '../shared/shared-primeng.module';
@NgModule({
  declarations: [AuthComponent, QuickviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    UiModule,
    sharedPrimengModule
  ]
})
export class AuthModule { }
