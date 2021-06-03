import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';

import { NgxLoginComponent } from './login/login.component'; // <---
import { NgxResetComponent } from './reset-password/reset-password.component';
import { ThemeModule } from '../@theme/theme.module';
import { AuthComponent } from './auth.component';



@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbIconModule,
    NbCardModule,
    NbAuthModule,
    NbLayoutModule,
    FormsModule,
  ],
  declarations: [
    NgxLoginComponent, // <---
    NgxResetComponent,
    AuthComponent,
  ],
})
export class NgxAuthModule {}
