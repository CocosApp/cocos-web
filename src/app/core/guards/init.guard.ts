import { CanActivate, Router } from "@angular/router";
import { UsersService } from "../services/users.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class InitGuard implements CanActivate{

    constructor(private users: UsersService, private router: Router){

    }

    canActivate(): Observable<boolean>{
        return new Observable<boolean>(subs=>{
            setTimeout(() => {
                this.users.populate().first()/*.delay(10000)*/.subscribe(couldPopulate => {
                    // if(!couldPopulate){
                    //     this.router.navigateByUrl('/auth');
                    // }
                    subs.next(true);                    
                    setTimeout(() => {
                        if(document.getElementById('preloader')){
                            document.getElementById('preloader').classList.add('animated','fadeOut');
                        }
                        setTimeout(() => {
                            if(document.getElementById('preloader')){
                                document.getElementById('preloader').remove();
                            }
                        }, 1000);        
                    }, 2000);
                });
                }, 0);
        });
    }

}