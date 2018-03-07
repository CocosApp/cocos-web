import { Component, OnInit } from '@angular/core';
import { Discount } from '../../shared/models/discount.model';
import { DiscountsService } from '../../core/services/discounts.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {

  discountList: Discount[];

  constructor(private discounts: DiscountsService,
    private sanitizer: DomSanitizer) { 
    this.discounts.get().subscribe( bs => this.discountList = bs );
  }

  ngOnInit() {
  }

  getBackgroundImage(discount: Discount){
    let backgroundUrl = '/assets/images/discount-placeholder.jpg';
    if( discount.photo ){
      backgroundUrl = discount.photo.imageUrl;
    }
    return this.sanitizer.bypassSecurityTrustStyle(`url(${backgroundUrl})`);
  }
}
