import { Component } from '@angular/core';
import { NbRequestPasswordComponent } from '@nebular/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
})
export class NgxResetComponent extends NbRequestPasswordComponent {}
