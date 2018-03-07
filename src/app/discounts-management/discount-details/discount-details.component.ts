import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Photo } from '../../shared/models/shared/photo.model';
import { Discount } from '../../shared/models/discount.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Card } from '../../shared/models/card.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DiscountsService } from '../../core/services/discounts.service';
import { CardsService } from '../../core/services/cards.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {

  discount: Discount;
  discountFG: FormGroup;
  cardList: Card[];
  //FOR IMAGE UPLOAD
  maxPhotoQuantity: number = 1;
  changingPhotoIndex: number = undefined;
  reader = new FileReader();
  @ViewChild('photoInputAdd') photoInputAddElm: ElementRef;
  
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private route: ActivatedRoute, 
    private discounts: DiscountsService, private cards: CardsService) {
    this.discount = this.route.snapshot.data.discount;
    this.discountFG = this.fb.group({
      id: undefined,
      name: ['',[Validators.required]],
      card: [undefined,[Validators.required]],
      photoList: this.fb.array([]),
      percentage: [0,[Validators.required]],
      price: [0,[Validators.required]],
      termsAndConditions: ['',[Validators.required]],
      description: ['',[Validators.required]],
      isOwner: [false,[Validators.required]],
    });
    this.fillFormModels();
  }

  fillFormModels(){
    if(this.discount) {
      this.discountFG.patchValue(this.discount);
      ( this.discount.photo? [this.discount.photo] : []).forEach( p => this.addPhotoFC(p) );
    };
    Observable.forkJoin(
      this.cards.get()
    ).subscribe(results=>{
      this.cardList = results[0];
      let cardFromList = undefined;
      if(this.discount){
        if( this.discount.card){
          cardFromList = this.cardList.find( c => c.id == this.discount.card.id );
        }
      }
      this.discountFG.patchValue({
        card: cardFromList
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

  get photoListFA(): FormArray{
    return this.discountFG.get('photoList') as FormArray;
  }

  get nonDeleteImagesCount(): number{
    return this.photoListFA.controls.filter( c => !c.value.forDelete ).length ;
  }

  addPhotoFC(photo: Photo){
    this.photoListFA.push(this.fb.group({
      image: photo.image,
      imageUrl: photo.imageUrl,
      forDelete: false
    }));
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

}
