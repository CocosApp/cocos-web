import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: 'app/landing/landing.module#LandingModule'
    },
    {
        path: 'admin/auth',
        loadChildren: 'app/admin-auth/admin-auth.module#AdminAuthModule'
    },
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
