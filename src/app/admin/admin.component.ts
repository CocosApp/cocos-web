import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  navLinks: any[] = [
    {
      path: 'sucursales',
      label: 'Sucursales'
    },
    {
      path: 'descuentos',
      label: 'Descuentos'
    }
  ]

  constructor(public users: UsersService) { }

  ngOnInit() {
  }

}
