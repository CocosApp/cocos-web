import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Branch } from '../../shared/models/branch.model';
import { BranchesService } from '../../core/services/branches.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ServicesService } from '../../core/services/services.service';
import { DiscountsService } from '../../core/services/discounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../shared/models/category.model';
import { Discount } from '../../shared/models/discount.model';
import { Service } from '../../shared/models/service.model';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { ITime } from '../../shared/vendor/material-time-control/time-control/index';
import { Schedule } from '../../shared/models/schedule.model';
import { SchedulesService } from '../../core/services/schedules.service';
import 'rxjs/add/observable/forkJoin';
import { GeocodingService } from '../../core/services/geocoding.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Photo } from '../../shared/models/shared/photo.model';
import { ToastService } from '../../core/services/shared/toast.service';
import { ArrayLengthValidator } from '../../shared/validators/array-length.validator';
import { User } from '../../shared/models/user.model';
import { LocationValidator } from '../../shared/validators/location.validator';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent implements OnInit {

  branch: Branch;
  branchFG: FormGroup;
  categoryList: Category[];
  scheduleList: Schedule[];
  discountList: Discount[];
  serviceList: Service[];
  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom: number = 18;
  @ViewChild("searchAddress") public searchElementRef: ElementRef;
  //FOR IMAGE UPLOAD
  maxPhotoQuantity: number = 3;
  changingPhotoIndex: number = undefined;
  reader = new FileReader();
  currentUser: User;
  duplicated = false;
  @ViewChild('photoInputAdd') photoInputAddElm: ElementRef;
  
  constructor(private fb: FormBuilder, private branches: BranchesService, 
  private categories: CategoriesService, private services: ServicesService, private geocoding: GeocodingService,
  private schedules: SchedulesService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
  private sanitizer: DomSanitizer, private route: ActivatedRoute, private discounts: DiscountsService,
  private router: Router, private toast: ToastService ) {
    this.branch = this.route.snapshot.data.branch;
    this.duplicated = this.route.snapshot.queryParams.duplicar;
    this.currentUser = this.route.snapshot.data.user;
    this.branchFG = this.fb.group({
      id: undefined,
      name: ['',[Validators.required]],
      subcategoryList: [[],[new ArrayLengthValidator(1,2)]],
      longitude: ['',[Validators.required]],
      latitude: ['',[Validators.required]],
      address: ['',[new LocationValidator()]],
      scheduleList: [[],[Validators.required]],
      ruc: ['',[Validators.required]],
      // discountList: [[],[Validators.required]],
      menu: [undefined,[]],
      menuPublicUrl: ['',[]],
      phoneList: this.fb.array(['','']),
      photoList: this.fb.array([]),
      whatsapp: ['',[Validators.required]],
      facebookPageUrl: ['',[Validators.required]],
      serviceList: [[],[Validators.required]],
    });
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
          this.branchFG.patchValue({
            latitude: this.lat,
            longitude: this.lng,
            address: place.formatted_address
          });
          this.branchFG.get('address').updateValueAndValidity();
        });
      });
    });
    this.fillFormModels();
  }

  fillFormModels(){
    if(this.branch) {
      this.branchFG.patchValue(this.branch);
      this.lat = this.branch.latitude;
      this.lng = this.branch.longitude;
      (this.branch.phoneList || []).forEach( (p,i) => {
        (this.branchFG.get('phoneList') as FormArray).controls[i].patchValue(p);
      });
      (this.branch.photoList || []).forEach( p => {
        this.addPhotoFG(p);
      });
      if(this.duplicated){
        this.branchFG.patchValue({
          address: '',
          latitude: 0,
          longitude: 0
        });
        this.lat = 0;
        this.lng = 0;
      }
    };
    Observable.forkJoin(
      this.categories.get(), this.discounts.get(), this.services.get(), this.schedules.get()
    ).subscribe(results=>{
      this.categoryList = results[0];
      this.discountList = results[1];
      this.serviceList = results[2];
      this.scheduleList = results[3];
      let categoriesFromList = [];
      let discountsFromList = [];
      let servicesFromList = [];
      let schedulesFromList = []
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
        if( this.branch.scheduleList && this.branch.scheduleList.length > 0){
          schedulesFromList = this.scheduleList.filter( s => this.branch.scheduleList.find( saux => s.id == saux.id ) );
        }
      }
      this.branchFG.patchValue({
        subcategoryList: categoriesFromList,
        // discountList: discountsFromList,
        serviceList: servicesFromList,
        scheduleList: schedulesFromList
      });
    });
  }

  ngOnInit(){
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

  onSendRequest(){

  }

  get nonDeleteImagesCount(): number{
    return this.photoListFA.controls.filter( c => !c.value.forDelete ).length ;
  }

  addPhoto(ev){
    let file = ev.target.files[0];
    if(file){
      // this.photoListFA.push( this.fb.group({
      //   image: file,
      //   imageUrl: '',
      //   forDelete: false
      // }));
      this.addPhotoFG(new Photo({ image: file, imageUrl: undefined, forDelete: false }));
      this.reader.readAsDataURL( file );
    }
  }
  
  addPhotoFG(photo: Photo){
    this.photoListFA.push( this.fb.group({
      id: photo.id,
      image: photo.image,
      imageUrl: photo.imageUrl,
      forDelete: photo.forDelete
    }));
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
    if(this.branchFG.valid){
      let branch = new Branch(this.branchFG.value);
      if(!!branch.id && !this.duplicated){
        // console.log(branch);
        this.branches.update(branch).subscribe( branch => {
          if(branch){
            if(this.duplicated){
              this.toast.success('El restaurante ha sido duplicado correctamente');
            }else{
              this.toast.success('El restaurante ha sido actualizado correctamente');
            }
            this.router.navigateByUrl('/admin/restaurantes');
          }
        });
      }else{
        this.branches.add(branch).subscribe( branch => {
          if(branch){
            this.toast.success('El restaurante ha sido creado correctamente');
            this.router.navigateByUrl('/admin/restaurantes');
          }
        });
      }
    }else{
      this.toast.warning('Hay campos requeridos sin completar');
      return;
    }
  }

  onChangeMenu(ev){
    if(ev.target.files[0]){
      this.branchFG.patchValue({
        menu: ev.target.files[0]
      });
    }
  }
}
