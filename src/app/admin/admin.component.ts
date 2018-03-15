import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services/users.service';
import { ShareService } from '../core/services/share.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public users: UsersService, private share: ShareService) { }

  ngOnInit() {
  }

  onShareFacebook(){
    let url = location.href.includes('localhost')? 'http://138.197.122.110:33/' :
            location.pathname == '/' ? location.href : location.href.replace(location.pathname,'');
    this.share.facebook('Registra tu restaurante en COCOS y haz que todos sepan de tus promociones',url);
  }

  onShareTwitter(){
    let url = location.href.includes('localhost')? 'http://138.197.122.110:33/' :
            location.pathname == '/' ? location.href : location.href.replace(location.pathname,'');
    this.share.twitter('Registra tu restaurante en COCOS y haz que todos sepan de tus promociones',url);
  }

}
