import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
declare var $;

let dialogRefHelper: MatDialogRef<MenuPopupComponent> = undefined;

@Component({
  selector: 'app-menu-popup',
  templateUrl: './menu-popup.component.html',
  styleUrls: ['./menu-popup.component.scss']
})
export class MenuPopupComponent implements OnInit, AfterViewInit {

  constructor(private dialogRef: MatDialogRef<MenuPopupComponent>) { 
    dialogRefHelper = dialogRef;
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    $('.menu-popup [scroll-to]').each(function(){
      let $el = $(this);
      $el.on('click',function(ev){
        ev.preventDefault();
        // $(document).scrollTo($el.attr('scroll-to'),500,{easing: 'swing'});
        dialogRefHelper.close($el.attr('scroll-to'));
      })
    })
  }

}
