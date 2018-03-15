import { BaseService } from "./base/base-service";
import { Injectable } from "@angular/core";
declare var sharon;

@Injectable()
export class ShareService extends BaseService{

    facebook(title: string, url: string){
        let pathname = location.pathname;
        sharon.facebook(
            // location.href.includes('localhost')? 'http://138.197.122.110:33/' :
            // pathname == '/' ? location.href : location.href.replace(pathname,''),
            url,
            { title }
        )
    }
    
    twitter(title: string, url?: string){
        let pathname = location.pathname;
        sharon.twitter(
            // location.href.includes('localhost')? 'http://138.197.122.110:33/' :
            // pathname == '/' ? location.href : location.href.replace(pathname,''),
            url,
            { title }
        )
    }

}