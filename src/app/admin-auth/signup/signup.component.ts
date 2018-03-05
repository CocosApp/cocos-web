import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EqualsToValidator } from '../../shared/validators/equals-to.validator';
import { Category } from '../../shared/models/category.model';
import { Discount } from '../../shared/models/discount.model';
import { Service } from '../../shared/models/service.model';
import { BranchesService } from '../../core/services/branches.service';
import { UsersService } from '../../core/services/users.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ServicesService } from '../../core/services/services.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { SchedulesService } from '../../core/services/schedules.service';
import { Schedule } from '../../shared/models/schedule.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupFG: FormGroup;
  branchFG: FormGroup;
  categoryList: Category[];
  scheduleList: Schedule[];
  serviceList: Service[];
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private fb: FormBuilder, private users: UsersService,private branches: BranchesService, 
  private categories: CategoriesService, private services: ServicesService,
  private schedules: SchedulesService) { 
    this.signupFG = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      ruc: ['',[Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
      businessName: ['',[Validators.required]],
      comments: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirmPassword: ['',[EqualsToValidator.buildValidator('password')]],
      email: ['',[Validators.required]],
      phone: ['',[Validators.required]],
    });
    this.branchFG = this.fb.group({
      name: ['',[Validators.required]],
      subcategoryList: [[],[Validators.required]],
      longitude: ['',[Validators.required]],
      latitude: ['',[Validators.required]],
      address: ['',[Validators.required]],
      scheduleList: [[],[Validators.required]],
      discountList: [[],[Validators.required]],
      menu: [undefined,[Validators.required]],
      menuPublicUrl: ['',[Validators.required]],
      phoneList: ['',[Validators.required]],
      photoList: [[],[Validators.required]],
      whatsapp: ['',[Validators.required]],
      facebookPageUrl: ['',[Validators.required]],
      serviceList: [[],[Validators.required]],
    });
    Observable.forkJoin(
      this.categories.get(), this.services.get(), this.schedules.get()
    ).subscribe(results=>{
      this.categoryList = results[0];
      this.serviceList = results[1];
      this.scheduleList = results[2];
    })
  }

  ngOnInit() {
  }

}
