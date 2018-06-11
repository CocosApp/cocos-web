import { Resolve } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Observable } from "rxjs/Observable";
import { UsersService } from "../services/users.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CurrentUserResolver implements Resolve<User>{
    constructor(private users: UsersService){
        
    }
    resolve(): Observable<User>{
        return this.users.getCurrentUser().first();
    }
    
}