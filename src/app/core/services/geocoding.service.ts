import { BaseService } from "./base/base-service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";

@Injectable()
export class GeocodingService{

    apikey: string;

    constructor(private http: HttpClient){
        this.apikey = environment.geocoding.apiKey;
    }

    getCoordinates(address: string): Observable<{ lat: number, lng: number }>{
        return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.apikey}`)
        .map( (resp:any) => {
            if( resp && resp.results && resp.results.geometry && resp.results.geometry.location ){
                return {
                    lat: resp.results.geometry.location.lat,
                    lng: resp.results.geometry.location.lng
                }
            }
            return undefined;
        })
    }

    getAddress(lat: number, lng: number): Observable<string>{
        return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apikey}`)
        .map( (resp:any) => {
            if( resp.results[0] && resp.results[0] && resp.results[0].formatted_address ){
                return resp.results[0].formatted_address;
            }
            return undefined;
        })
    }
}