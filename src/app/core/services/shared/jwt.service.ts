import { Injectable } from "@angular/core";
import { LocalStorageService, LocalStorageKeys } from "./local-storage.service";

@Injectable()
export class JwtService{
    
    private token: string;

    constructor(private localStorage: LocalStorageService){

    }

    public getToken(): string{
        // if(!this.token){
            this.token = this.localStorage.load<string>(LocalStorageKeys.TOKEN);
        // }
        return this.token;
    }

    public setToken(token: string){
        this.localStorage.save(LocalStorageKeys.TOKEN, token);
        this.token = token;
    }

}