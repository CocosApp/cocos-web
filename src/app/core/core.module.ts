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
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { BranchesService } from './services/branches.service';
import { CategoriesService } from './services/categories.service';
import { ServicesService } from './services/services.service';
import { DiscountsService } from './services/discounts.service';
import { SchedulesService } from './services/schedules.service';
import { GeocodingService } from './services/geocoding.service';
import { CardsService } from './services/cards.service';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    ApiService,
    BaseService,
    UsersService,
    JwtService,
    LocalStorageService,
    ToastService,
    AdminAuthGuard,
    AdminGuard,
    BranchesService,
    CategoriesService,
    ServicesService,
    DiscountsService,
    SchedulesService,
    GeocodingService,
    CardsService
  ],
  declarations: []
})
export class CoreModule { }
