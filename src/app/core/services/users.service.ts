import { Injectable } from "@angular/core";
import { BaseService } from "./base/base-service";
import { CrudService } from "./contracts/crud-service";
import { Specification } from "./specifications/base/specification";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ApiService } from "./shared/api.service";
import { User } from "../../shared/models/user.model";
import { Router } from "@angular/router";
import { UserByIdSpecification } from "./specifications/user.specification";
import { JwtService } from "./shared/jwt.service";
import { LocalStorageService, LocalStorageKeys } from "./shared/local-storage.service";
import { ToastService } from "./shared/toast.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService extends BaseService implements CrudService<User>{

    private currentUser: BehaviorSubject<User>;

    constructor(api: ApiService, private router: Router, private jwt: JwtService, private storage: LocalStorageService
    , toast: ToastService){
        super(api,toast);
        this.currentUser = new BehaviorSubject<User>(
            new User(this.storage.load(LocalStorageKeys.CURRENT_USER) as any)
        );
    }

    getCurrentUser(): Observable<User>{
        return this.currentUser.asObservable();
    }

    setCurrentUser(user: User): void{
        this.currentUser.next(user);
    }

    login(email :string, password: string): Observable<boolean>{
        return this.api.post('v1/login',{ email: email, password: password },undefined,false)
                .map( resp => {
                    if(resp){
                        this.jwt.setToken(resp.data.access_token);
                        return true;
                    }
                    return false;
                }).catch( err => {
                    // this.toast.error('','Credenciales incorrectas');
                    return Observable.of(false);
                });
    }

    register(user: User): Observable<boolean>{
        return this.api.post('user/admin/register',{
            email: user.email,
        	password: user.password,
        	first_name: user.firstName,
            last_name: user.lastName,
            ruc: user.ruc,
            business_name: user.businessName,
            cellphone: user.phone,
            comment: user.phone
        }).map( resp => {
            if(resp.token){
                this.jwt.setToken(resp.token);
                return true;
            }
            return false;
        }).catch( err => {
            this.toast.error('No se pudo registrar el usuario');
            return Observable.of(false);
        });
    }

    // loginWithFacebook(): Observable<boolean>{
    //     return this.socials.loginWithFacebook().flatMap(
    //         resp => {
    //             if(resp){
    //                 console.log(resp);
    //                 return this.api.post('v1/login/facebook',{
    //                     access_token: resp.authResponse.accessToken
    //                 },undefined,false).map( resp => true )
    //             }else{
    //                 return Observable.of(false);
    //             }
    //         }
    //     ).catch( err => Observable.of(false) );
    // }

    logout(){
        this.purge();
        this.router.navigateByUrl('/auth');
    }

    populate(): Observable<boolean>{
        this.currentUser.next(new User({
            
        }));
        return Observable.of(true);
        // return this.api.get('v1/accounts/')
        //     .map( resp => {
        //         this.currentUser.next(new User({
        //             id: resp.id,
        //             email: resp.email,
        //             firstName: resp.first_name,
        //             lastName: resp.last_name,
        //             avatarUrl: resp.picture || '/assets/images/dashboard/veterinarian-person.svg',
        //             phone: resp.cellphone
        //         }));
        //         return true;
        //     }).catch( err => Observable.of(false).do( () => {
        //         this.purge();
        //         this.toast.error('Redireccionando a Login','No se pudo recuperar datos del usuario');
        //     } ) );
    }

    purge(){
        this.storage.clear();
    }

    get(specification?: Specification<User>): Observable<User[]> {
        // let id: number = 1;
        // let userList: User[] = [
        //     new User({
        //         id: id++,
        //         firstName: 'Dinjo Josafat',
        //         lastName: 'Vara Huayta',
        //         phone: '972395720',
        //         email: 'jvarahuayta@gmail.com',
        //         role: new Role({
        //             id: 1,
        //             name: 'Administrador'
        //         })
        //     }),
        //     new User({
        //         id: id++,
        //         firstName: 'Dinjo Josafat',
        //         lastName: 'Vara Huayta',
        //         phone: '972395720',
        //         email: 'jvarahuayta@gmail.com',
        //         role: new Role({
        //             id: 2,
        //             name: 'Empleado'
        //         })
        //     })
        // ]
        // if(specification instanceof UserByIdSpecification){
        //     userList = userList.filter( u => u.id == specification.id);
        // }
        // return Observable.of(userList);
        return Observable.of([]);
    }
    update(entity: User): Observable<User> {
        throw new Error("Method not implemented.");
    }
    add(entity: User): Observable<User> {
        throw new Error("Method not implemented.");
    }
    remove(entity: User): Observable<User> {
        throw new Error("Method not implemented.");
    }
    
}