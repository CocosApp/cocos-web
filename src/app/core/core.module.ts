import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseService } from './services/base/base-service';
import { UsersService } from './services/users.service';
import { ApiService } from './services/shared/api.service';
import { JwtService } from './services/shared/jwt.service';
import { LocalStorageService } from './services/shared/local-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from './services/shared/toast.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { BranchesService } from './services/branches.service';
import { CategoriesService } from './services/categories.service';
import { ServicesService } from './services/services.service';
import { DiscountsService } from './services/discounts.service';
import { SchedulesService } from './services/schedules.service';
import { GeocodingService } from './services/geocoding.service';
import { CardsService } from './services/cards.service';
import { MatSnackBarModule } from '@angular/material';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { InitComponent } from './components/init/init.component';
import { RouterModule } from '@angular/router';
import { InitGuard } from './guards/init.guard';
import { ShareService } from './services/share.service';
import { CurrentUserResolver } from './resolvers/current-user.resolver';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule,
    NgProgressModule.forRoot({
      color: '#ff9d3f',
      thick: true
    }),
    NgProgressHttpModule
  ],
  providers: [
    ApiService,
    BaseService,
    UsersService,
    JwtService,
    LocalStorageService,
    ToastService,
    AdminGuard,
    BranchesService,
    CategoriesService,
    ServicesService,
    DiscountsService,
    SchedulesService,
    GeocodingService,
    CardsService,
    InitGuard,
    AuthGuard,
    AdminGuard,
    ShareService,
    CurrentUserResolver
  ],
  declarations: [ InitComponent ],
  exports: [
    NgProgressModule,
    InitComponent
  ]
})
export class CoreModule { }
