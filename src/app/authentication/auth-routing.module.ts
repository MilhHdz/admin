import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { NbAuthComponent } from '@nebular/auth';
import { AuthComponent } from './auth.component';

import { NgxLoginComponent } from './login/login.component'; // <---
import { NgxResetComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                component: NgxLoginComponent, // <---
            },
            {
                path: 'reset-password',
                component: NgxResetComponent,
            },
            { path: '', redirectTo: '', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NgxAuthRoutingModule {}
