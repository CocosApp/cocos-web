import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: 'app/landing/landing.module#LandingModule'
    },
    {
        path: 'auth',
        loadChildren: 'app/admin-auth/admin-auth.module#AdminAuthModule',
        data: { animation : 'loginPage' }
    },
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule',
        data: { animation : 'adminPage' }
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
