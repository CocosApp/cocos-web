import { Component, OnInit } from '@angular/core';
import { Discount } from '../../shared/models/discount.model';
import { DiscountsService } from '../../core/services/discounts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastService } from '../../core/services/shared/toast.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {

  discountList: Discount[];

  constructor(private discounts: DiscountsService, private toast: ToastService,
    private sanitizer: DomSanitizer) {
      this.load();
  }

  ngOnInit() {
  }

  getBackgroundImage(discount: Discount){
    let backgroundUrl = '/assets/images/discount-placeholder.jpg';
    if( discount.photoList && discount.photoList.length > 0 ){
      backgroundUrl = discount.photoList[0].imageUrl;
    }
    return this.sanitizer.bypassSecurityTrustStyle(`url(${backgroundUrl})`);
  }

  load(){
    this.discounts.get().subscribe( bs => this.discountList = bs );
  }

  onRemove(discount: Discount){
    this.discounts.remove(discount).subscribe( d => {
      if(d){
        this.toast.success('Descuento eliminado con éxito');
        this.load();
      }
    })
  }
}
