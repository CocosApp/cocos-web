import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UsersService } from "../services/users.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminAuthGuard implements CanActivate{

    constructor(private users: UsersService, private router: Router){

    }

    canActivate(): Observable<boolean>{
        return this.users.getCurrentUser().first().map( currentUser => {
            if( currentUser != undefined ){
                this.router.navigateByUrl('/admin');
            }
            return currentUser == undefined;  
        });
    }
    
}