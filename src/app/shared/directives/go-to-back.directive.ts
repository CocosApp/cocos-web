import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[goToBack]'
})
export class GoToBackDirective {

  @HostListener('click', ['$event']) onClick($event){
      this.backClicked();
  }

  constructor(private _location: Location) {
  }

  backClicked() {
      this._location.back();
  }

}
