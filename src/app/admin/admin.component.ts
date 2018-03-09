import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  

  constructor(public users: UsersService) { }

  ngOnInit() {
  }

}
