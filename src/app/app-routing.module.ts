import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { InitComponent } from './core/components/init/init.component';
import { InitGuard } from './core/guards/init.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
    {
        path: '',
        component: InitComponent,
        canActivate: [
            InitGuard
        ],
        children: [
            {
                path: '',
                loadChildren: 'app/landing/landing.module#LandingModule'
            },
            {
                path: 'auth',
                loadChildren: 'app/admin-auth/admin-auth.module#AdminAuthModule',
                data: { animation : 'loginPage' },
                canActivate: [
                    AuthGuard
                ]
            },
            {
                path: 'admin',
                loadChildren: 'app/admin/admin.module#AdminModule',
                data: { animation : 'adminPage' },
                canActivate: [
                    AdminGuard
                ]
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
