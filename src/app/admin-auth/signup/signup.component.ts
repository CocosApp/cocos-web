import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
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
import { SchedulesService } from '../../core/services/schedules.service';
import { Schedule } from '../../shared/models/schedule.model';
import { UrlValidator } from '../../shared/validators/url.validator';
import { GeocodingService } from '../../core/services/geocoding.service';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import 'rxjs/add/observable/forkJoin';
import { LocationValidator } from '../../shared/validators/location.validator';
import { FormArray } from '@angular/forms/src/model';
import { DomSanitizer } from '@angular/platform-browser';
import { Photo } from '../../shared/models/shared/photo.model';
import { LengthValidator } from '../../shared/validators/length.validator';
import { ToastService } from '../../core/services/shared/toast.service';
import { User } from '../../shared/models/user.model';
import { Branch } from '../../shared/models/branch.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessRequestComponent } from '../success-request/success-request.component';
import { ArrayLengthValidator } from '../../shared/validators/array-length.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loading: boolean = false;
  signupFG: FormGroup;
  branchFG: FormGroup;
  categoryList: Category[];
  scheduleList: Schedule[];
  serviceList: Service[];
  lat: number = -12.0375515;
  lng: number = -77.0790227;
  zoom: number = 12;
  @ViewChild("searchAddress") public searchElementRef: ElementRef;
  //FOR IMAGE UPLOAD
  maxPhotoQuantity: number = 3;
  changingPhotoIndex: number = undefined;
  reader = new FileReader();
  @ViewChild('photoInputAdd') photoInputAddElm: ElementRef;

  constructor(private fb: FormBuilder, private users: UsersService,private branches: BranchesService, 
  private categories: CategoriesService, private services: ServicesService, private geocoding: GeocodingService,
  private schedules: SchedulesService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
  private sanitizer: DomSanitizer, private toast: ToastService, private router: Router, private dialog: MatDialog) { 
    this.signupFG = this.fb.group({
      ruc: ['',[Validators.required, new LengthValidator(11)]],
      businessName: ['',[Validators.required]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      comments: ['',[/*Validators.required*/]],
      password: ['',[Validators.required]],
      confirmPassword: ['',[EqualsToValidator.buildValidator('password')]],
      email: ['',[Validators.email]],
      phone: ['', [new LengthValidator(9)]],
    });
    this.branchFG = this.fb.group({
      ruc: ['',[Validators.required, new LengthValidator(11)]],
      businessName: ['',[Validators.required]],
      name: ['',[Validators.required]],
      subcategoryList: [[],[new ArrayLengthValidator(1,2)]],
      longitude: ['',[Validators.required]],
      latitude: ['',[Validators.required]],
      address: ['',[new LocationValidator()]],
      scheduleList: [[],[Validators.required]],
      menu: [undefined,[]],
      // menuPublicUrl: ['',[Validators.required]],
      phoneList: this.fb.array(['','']),
      photoList: this.fb.array([]),
      whatsapp: ['', [new LengthValidator(9)]],
      facebookPageUrl: ['',[new UrlValidator()]],
      serviceList: [[],[Validators.required]],
    });
    Observable.forkJoin(
      this.categories.get(), this.services.get(), this.schedules.get()
    ).subscribe(results=>{
      this.categoryList = results[0];
      this.serviceList = results[1];
      this.scheduleList = results[2];
    })
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 18;
          this.branchFG.patchValue({
            latitude: this.lat,
            longitude: this.lng
          });
          this.branchFG.get('address').updateValueAndValidity();
        });
      });
    });
  }

  ngOnInit() {
    this.reader.addEventListener('load', ()=>{
      if(this.changingPhotoIndex != undefined){
        this.photoListFA.controls[this.changingPhotoIndex].patchValue({
          imageUrl: this.reader.result
        });
        this.changingPhotoIndex = undefined;
      }else{
        this.photoListFA.controls[this.photoListFA.controls.length-1].patchValue({
          imageUrl: this.reader.result
        });
      }
      this.photoInputAddElm.nativeElement.value = '';
    });
  }

  get photoListFA(): FormArray{
    return this.branchFG.get('photoList') as FormArray;
  }

  onMapClick(coords){
    this.geocoding.getAddress(coords.lat,coords.lng).subscribe( address => {
      this.branchFG.patchValue({
        address: address,
        latitude: coords.lat,
        longitude: coords.lng
      });
      this.branchFG.get('address').updateValueAndValidity();
    })
  }

  onChangeMenu(ev){
    if(ev.target.files[0]){
      this.branchFG.patchValue({
        menu: ev.target.files[0]
      });
    }
  }

  get nonDeleteImagesCount(): number{
    return this.photoListFA.controls.filter( c => !c.value.forDelete ).length ;
  }

  addPhoto(ev){
    let file = ev.target.files[0];
    if(file){
      this.photoListFA.push( this.fb.group({
        image: file,
        imageUrl: '',
        forDelete: false
      }));
      this.reader.readAsDataURL( file );
    }
  }

  changePhoto(ev,i){
    let file = ev.target.files[0];
    if(file){
      this.photoListFA.controls[i].patchValue({
        image: file,
      });
      this.changingPhotoIndex = i;
      this.reader.readAsDataURL( file );
    }
  }

  getPhotoBackground(image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  onDeleteImage(image: Photo, index: number){
    if(!image.id){
      this.photoListFA.removeAt(index);
    }else{
      this.photoListFA.controls[index].patchValue({
        forDelete: true
      });
    }
  }

  onConfirm(){
    if(this.photoListFA.controls.length==0){
      this.toast.warning('Al menos una imagen del restaurante');
      return;
    }
    if(this.signupFG.valid && this.branchFG.valid){
      this.signupFG.patchValue({
        comments: `
        Nombre: ${this.branchFG.value.name}; 
        Dirección: ${this.branchFG.value.address}; 
        Categorías: ${(this.branchFG.value.subcategoryList || []).map(c => c.name).join(', ')}; 
        Facebook: ${this.branchFG.value.facebookPageUrl};`,
        ruc: this.branchFG.value.ruc,
        businessName: this.branchFG.value.businessName
      });
      // this.branchFG.patchValue({
      //   ruc: this.signupFG.value.ruc
      // });
      this.signupFG
      this.loading = true;
      this.users.register( new User(this.signupFG.value) )
      .subscribe(canRegister => {
        if(canRegister){
          this.branches.add(new Branch(this.branchFG.value)).subscribe(created=>{
            if(created){
              this.dialog.open(SuccessRequestComponent,{ width: '320px', disableClose: true });
              this.users.logout();
            }else{
              this.loading = false;
            }
          });
        }else{
          this.loading = false;
        }
      })
    }else{
      this.toast.warning('Hay campos requeridos sin completar');
      return;
    }
  }
}
