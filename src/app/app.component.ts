import { Component, AfterViewInit } from '@angular/core';
import { Routing } from './shared/animations/routing';
import { BaseComponent } from './shared/components/base.component';
import { UsersService } from './core/services/users.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Routing.animation]
})
export class AppComponent extends BaseComponent implements AfterViewInit {
  title = 'app';
  ready: boolean = false;

  constructor(private users: UsersService, private router: Router){
    super();
  }

  ngAfterViewInit(){
    
  }
}
