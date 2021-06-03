import { Component } from '@angular/core';
import { NbAuthComponent } from '@nebular/auth';


@Component({
    selector: 'ngx-auth',
    styleUrls: ['./auth.component.scss'],
    template: `
    <nb-layout>
      <nb-layout-column style="display: flex; justify-content: center">
        <nb-card class="container" style="border-radius: 15px; width: 500px; height: auto;">
        <nb-card-body>
            <nb-auth-block>
              <router-outlet></router-outlet>
            </nb-auth-block>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
    `,
})
export class AuthComponent extends NbAuthComponent {}
