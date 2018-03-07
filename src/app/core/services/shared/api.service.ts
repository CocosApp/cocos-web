import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { JwtService } from "./jwt.service";

@Injectable()
export class ApiService {

    private backendUrl: string;

    constructor(private jwt: JwtService, private http: HttpClient) {
        this.backendUrl = environment.backendUrl+'api/';
    }

    private appendAuthorizationHeader(headers: HttpHeaders): HttpHeaders{
        headers = headers || new HttpHeaders();
        let token = this.jwt.getToken();
        if( token && token != ''){
            headers = headers.append('Authorization', `Token ${this.jwt.getToken()}`);
        }
        return headers;
    }

    public get(path: string, options?: { params?: HttpParams, headers?: HttpHeaders }): Observable<any>{
        options = options || {};
        options.headers = this.appendAuthorizationHeader(options.headers);
        return this.http.get(`${this.backendUrl}${path}`, { params: options.params, headers: options.headers });
    }

    public post(path: string, body?: any, options?: { params?: HttpParams, headers?: HttpHeaders }, isAuthenticated: boolean = true): Observable<any>{
        options = options || {};
        options.headers = isAuthenticated ? this.appendAuthorizationHeader(options.headers) : options.headers;
        return this.http.post(`${this.backendUrl}${path}`, body, { params: options.params, headers: options.headers });
    }

    public put(path: string, body?: any, options?: { params?: HttpParams, headers?: HttpHeaders }): Observable<any>{
        options = options || {};
        options.headers = this.appendAuthorizationHeader(options.headers);
        return this.http.put(`${this.backendUrl}${path}`, body, { params: options.params, headers: options.headers });
    }

    public patch(path: string, body?: any, options?: { params?: HttpParams, headers?: HttpHeaders }): Observable<any>{
        options = options || {};
        options.headers = this.appendAuthorizationHeader(options.headers);
        return this.http.patch(`${this.backendUrl}${path}`, body, { params: options.params, headers: options.headers });
    }

    public delete(path: string, options?: { params?: HttpParams, headers?: HttpHeaders }): Observable<any>{
        options = options || {};
        options.headers = this.appendAuthorizationHeader(options.headers);
        return this.http.delete(`${this.backendUrl}${path}`, { params: options.params, headers: options.headers });
    }
}
