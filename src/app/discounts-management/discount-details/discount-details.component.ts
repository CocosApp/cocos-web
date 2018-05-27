import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Photo } from '../../shared/models/shared/photo.model';
import { Discount } from '../../shared/models/discount.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Card } from '../../shared/models/card.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountsService } from '../../core/services/discounts.service';
import { CardsService } from '../../core/services/cards.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { ToastService } from '../../core/services/shared/toast.service';
import { BranchesService } from '../../core/services/branches.service';
import { Branch } from '../../shared/models/branch.model';
import { CreatedDiscountDialogComponent } from '../created-discount-dialog/created-discount-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {

  discount: Discount;
  discountFG: FormGroup;
  cardList: Card[];
  branchList: Branch[];
  //FOR IMAGE UPLOAD
  maxPhotoQuantity: number = 1;
  changingPhotoIndex: number = undefined;
  reader = new FileReader();
  discountTypeList = ['Precio', 'Porcentaje', 'Promoción'];
  @ViewChild('photoInputAdd') photoInputAddElm: ElementRef;
  
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private route: ActivatedRoute, 
    private discounts: DiscountsService, private cards: CardsService, private toast: ToastService,
    private router: Router, private branches: BranchesService, private dialog: MatDialog) {
    this.discount = this.route.snapshot.data.discount;
    console.log(this.discount);
    this.discountFG = this.fb.group({
      id: undefined,
      name: ['',[Validators.required]],
      card: [undefined,[]],
      branch: [undefined,[Validators.required]],
      previousBranch: [undefined,[]],
      photoList: this.fb.array([]),
      discountType: [null,[Validators.required]],
      percentage: [0,[]],
      price: [0,[]],
      promotion: ['',[]],
      termsAndConditions: ['',[Validators.required]],
      description: ['',[]],
      isOwner: [false,[Validators.required]],
      finishAt: [new Date(),[Validators.required]]
    });
    this.discountFG.get('discountType').valueChanges.subscribe((val)=>{
      if(val == this.discountTypeList[0])
        this.discountFG.patchValue({
          percentage: undefined,
          promotion: undefined
        })
      else if(val == this.discountTypeList[1])
      this.discountFG.patchValue({
        price: undefined,
        promotion: undefined
      })
      else if(val == this.discountTypeList[2])
      this.discountFG.patchValue({
        percentage: undefined,
        price: undefined,
      })
    })
    this.fillFormModels();
  }

  fillFormModels(){
    if(this.discount) {
      this.discountFG.patchValue(this.discount);
      if(this.discount.price != null) 
        this.discountFG.patchValue({ discountType: this.discountTypeList[0] });
      else if(this.discount.percentage != null) 
        this.discountFG.patchValue({ discountType: this.discountTypeList[1] });
      else if(this.discount.promotion != null) 
        this.discountFG.patchValue({ discountType: this.discountTypeList[2] });
      ( this.discount.photoList || []).forEach( p => this.addPhotoFC(p) );
    };
    Observable.forkJoin(
      this.cards.get(), this.branches.get()
    ).subscribe(results=>{
      this.cardList = results[0];
      this.branchList = results[1];
      let cardFromList = undefined;
      let branchFromList = undefined;
      if(this.discount){
        if( this.discount.card){
          cardFromList = this.cardList.find( c => c.id == this.discount.card.id );
        }
        if(this.discount.branch){
          branchFromList = this.branchList.find( b => b.id == this.discount.branch.id );
        }
      }
      this.discountFG.patchValue({
        card: cardFromList,
        branch: branchFromList
      });
    })
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

  clearCards(){
    this.discountFG.patchValue({
      card: undefined
    });
  }

  get photoListFA(): FormArray{
    return this.discountFG.get('photoList') as FormArray;
  }

  get nonDeleteImagesCount(): number{
    return this.photoListFA.controls.filter( c => !c.value.forDelete ).length ;
  }

  addPhotoFC(photo: Photo){
    this.photoListFA.push(this.fb.group({
      id: photo.id,
      image: photo.image,
      imageUrl: photo.imageUrl,
      forDelete: false
    }));
  }

  addPhoto(ev){
    let file = ev.target.files[0];
    if(file){
      this.addPhotoFC(new Photo({
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
    console.log(this.discountFG.value);
    if(this.discountFG.valid){
      let discount = new Discount(this.discountFG.value);
      // console.log(discount);
      if(discount.id){
        this.discounts.update(discount).subscribe( d => {
          if(d){
            // this.toast.success('Descuento actualizado con éxito');
            let dialogRef = this.dialog.open(CreatedDiscountDialogComponent,{
              data: {
                title: 'El descuento ha sido actualizado con éxito'
              }
            });
            dialogRef.afterClosed().subscribe( () => {
              this.router.navigateByUrl('/admin/descuentos');
            })
          }
        })
      }else {
        this.discounts.add(discount).subscribe( d => {
          if(d){
            // this.toast.success('Descuento creado con éxito');
            let dialogRef = this.dialog.open(CreatedDiscountDialogComponent,{
              data: {
                title: 'El descuento ha sido creado con éxito'
              }
            });
            dialogRef.afterClosed().subscribe( () => {
              this.router.navigateByUrl('/admin/descuentos');
            })
          }
        })
      }
    }else{
      this.toast.warning('Hay campos requeridos sin completar');
    }
  }
}
