import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UsersService } from "../services/users.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminGuard implements CanActivate{

    constructor(private users: UsersService, private router: Router){

    }

    canActivate(): Observable<boolean>{
        return this.users.getCurrentUser().first().map( u => {
            console.log(u);
            if( !u ){
                this.router.navigateByUrl('/auth');
                return false;
            }
            return true;
            
        });
    }
    
}