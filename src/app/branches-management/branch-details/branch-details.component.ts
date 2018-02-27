import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Branch } from '../../shared/models/branch.model';
import { BranchesService } from '../../core/services/branches.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ServicesService } from '../../core/services/services.service';
import { DiscountsService } from '../../core/services/discounts.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../shared/models/category.model';
import { Discount } from '../../shared/models/discount.model';
import { Service } from '../../shared/models/service.model';
import 'rxjs/add/observable/forkJoin';
import { ITime } from '../../shared/vendor/material-time-control/time-control/index';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent implements OnInit {

  branch: Branch;
  branchFG: FormGroup;
  categoryList: Category[];
  discountList: Discount[];
  serviceList: Service[];
  // private exportTime = {hour: 7, minute: 15, meriden: 'PM', format: 12};
  
  constructor(private fb: FormBuilder, private branches: BranchesService, private categories: CategoriesService,
  private services: ServicesService, private discounts: DiscountsService, private route: ActivatedRoute) {
    this.branch = this.route.snapshot.data.branch;
    this.branchFG = this.fb.group({
      name: ['',[Validators.required]],
      subcategoryList: [[],[Validators.required]],
      longitude: ['',[Validators.required]],
      latitude: ['',[Validators.required]],
      address: ['',[Validators.required]],
      openTime: ['',[Validators.required]],
      closeTime: ['',[Validators.required]],
      discountList: [[],[Validators.required]],
      menu: ['',[Validators.required]],
      menuPublicUrl: ['',[Validators.required]],
      phoneList: ['',[Validators.required]],
      photoList: [[],[Validators.required]],
      whatsapp: ['',[Validators.required]],
      facebookPageUrl: ['',[Validators.required]],
      serviceList: [[],[Validators.required]],
    });
    this.fillFormModels();
  }

  fillFormModels(){
    if(this.branch) this.branchFG.patchValue(this.branch);
    Observable.forkJoin(
      this.categories.get(), this.discounts.get(), this.services.get()
    ).subscribe(results=>{
      this.categoryList = results[0];
      this.discountList = results[1];
      this.serviceList = results[2];
      let categoriesFromList = [];
      let discountsFromList = [];
      let servicesFromList = [];
      if(this.branch){
        if( this.branch.subcategoryList && this.branch.subcategoryList.length > 0){
          categoriesFromList = this.categoryList.filter( c => this.branch.subcategoryList.find( caux => c.id == caux.id ) );
        }
        if( this.branch.discountList && this.branch.discountList.length > 0){
          discountsFromList = this.discountList.filter( d => this.branch.discountList.find( daux => d.id == daux.id ) );
        }
        if( this.branch.serviceList && this.branch.serviceList.length > 0){
          servicesFromList = this.serviceList.filter( s => this.branch.serviceList.find( saux => s.id == saux.id ) );
        }
      }
      this.branchFG.patchValue({
        categoryList: categoriesFromList,
        discountList: discountsFromList,
        serviceList: servicesFromList
      });
    })
  }

  ngOnInit(){

  }

  formatTime(time: string): ITime{
    time = (!time || time == '') ? '00:00 AM' : time;
    return {
      hour: parseInt(time.substr(0,2)),
      minute: parseInt(time.substr(3,2)),
      meriden: time.substr(6,2) == 'AM' ? 'AM' : 'PM', 
      format: 12
    }
  }

  setTime(time: ITime, control: AbstractControl){
    control.setValue( 
      time.hour.toString().padStart(2,'0') + ':' + time.minute.toString().padStart(2,'0') + ' ' + time.meriden
    );
  }
}
