import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MenuPopupComponent } from '../menu-popup/menu-popup.component';
declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit{

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    $(document).on('scroll',()=>{
      let st = $(document).scrollTop();
      if(st >= 200){
        $('.header').addClass('header--fixed');
      }else{
        $('.header').removeClass('header--fixed');
      }
    })
    $('.header [scroll-to]').each(function(){
      let $el = $(this);
      $el.on('click',function(ev){
        ev.preventDefault();
        $(document).scrollTo($el.attr('scroll-to'),500,{easing: 'swing'});
      })
    })
  }

  onOpenMenu(){
    let dialogRef = this.dialog.open(MenuPopupComponent,{
      height: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'menu-popup-dialog'
    });
    dialogRef.afterClosed().subscribe( scrollTo => {
      $(document).scrollTo(scrollTo,500,{easing: 'swing'});
    })
  }

}
