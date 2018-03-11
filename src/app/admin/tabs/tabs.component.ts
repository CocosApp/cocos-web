import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  
  navLinks: any[] = [
    {
      path: 'restaurantes',
      label: 'Restaurantes'
    },
    {
      path: 'descuentos',
      label: 'Descuentos'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
