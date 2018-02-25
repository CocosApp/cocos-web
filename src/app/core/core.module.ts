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

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    BranchesService
  ],
  declarations: []
})
export class CoreModule { }
