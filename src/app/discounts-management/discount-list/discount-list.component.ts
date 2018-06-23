import { Component, OnInit } from '@angular/core';
import { Discount } from '../../shared/models/discount.model';
import { DiscountsService } from '../../core/services/discounts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastService } from '../../core/services/shared/toast.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AnyDiscountComponent } from '../any-discount/any-discount.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent implements OnInit {

  discountList: Discount[];

  constructor(private discounts: DiscountsService, private toast: ToastService,
    private sanitizer: DomSanitizer, private router: Router,public dialog: MatDialog) {
      this.load();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(AnyDiscountComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
        this.router.navigateByUrl('/admin/descuentos/agregar');
    });
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
    this.discounts.get().subscribe( bs => {
      this.discountList = bs;
      if(this.discountList.length==0){
        // alert(' NO TIENES NINGUN DESCUENTO .....REALIZA EL PRIMERO ');
        this.openDialog();
      }

    });
  }

  onRemove(discount: Discount){    
    (this.dialog.open(ConfirmDialogComponent,{
      data: {
        title: `Eliminar el descuento ${discount.name}?`,
        message: 'Al eliminarse, ningún usuario podrá visualizar este descuento en la aplicación.'
      }
    })).afterClosed().subscribe( confirm => {
      if(confirm){
        this.discounts.remove(discount).subscribe( d => {
          if(d){
            this.toast.success('Descuento eliminado con éxito');
            this.load();
          }
        })
      }
    })
  }
}
