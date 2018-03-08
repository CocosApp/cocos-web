import { Component, AfterViewInit } from '@angular/core';
import { Routing } from './shared/animations/routing';
import { BaseComponent } from './shared/components/base.component';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Routing.animation]
})
export class AppComponent extends BaseComponent implements AfterViewInit {
  title = 'app';
  ready: boolean = false;

  constructor(private users: UsersService){
    super();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.users.populate().subscribe(couldPopulate => {
        this.ready = true;
        setTimeout(() => {
          document.getElementById('preloader').classList.add('animated','fadeOut');
          setTimeout(() => {
            document.getElementById('preloader').remove();
          }, 1000);        
        }, 2000);
      });
    }, 0);
  }
}
