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
import 'rxjs/add/operator/mergeMap';
import { BranchMapper } from "./mappers/branch.mapper";

@Injectable()
export class UsersService extends BaseService implements CrudService<User>{

    private currentUser: BehaviorSubject<User>;

    constructor(api: ApiService, private router: Router, private jwt: JwtService, private storage: LocalStorageService
    , toast: ToastService){
        super(api,toast);
        this.currentUser = new BehaviorSubject<User>(
            // new User(this.storage.load(LocalStorageKeys.CURRENT_USER) as any)
            undefined
        );
    }

    getCurrentUser(): Observable<User>{
        return this.currentUser.asObservable();
    }

    setCurrentUser(user: User): void{
        this.currentUser.next(user);
    }

    login(email :string, password: string): Observable<boolean>{
        return this.api.post('user/admin/login',{ email: email, password: password },undefined,false)
        .map( resp => {
            if(resp.token){
                this.jwt.setToken(resp.token);
                return true;
            }
            this.toast.error('Credenciales incorrectas o usuario inactivo');
            return false;
        }).catch( err => {
            this.toast.error('Credenciales incorrectas o usuario inactivo');
            return Observable.of(false);
        }).flatMap( couldLogin => {
            if(couldLogin){
                return this.populate();
            }
            return Observable.of(false);
        }).catch( err => {
            // this.toast.error('No se pudo recuperar los datos del usuario');
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
            comment: user.comments
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

    recoverPassword(email: string): Observable<boolean>{
        return this.api.post('recovery/',{ email }).map( resp => {
            return true;
        }).catch( err => {
            this.toast.error(`No se pudo recuperar su password`);
            return Observable.of(false)
        })
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
        this.currentUser.next(undefined);
        this.router.navigateByUrl('/auth');
    }

    populate(): Observable<boolean>{
        let token = this.jwt.getToken();
        if( !token || token == '' ){
            return Observable.of(false);
        }else{
            return this.api.get('user/admin/retrieve')
            .map( resp => {
                if(resp){
                    if(resp.is_admin_res){
                        this.currentUser.next(new User({
                            id: resp.id,
                            email: resp.email,
                            firstName: resp.first_name,
                            lastName: resp.last_name,
                            ruc: resp.ruc,
                            phone: resp.cellphone,
                            businessName: resp.business_name,
                            branchList: resp.restaurant.map( BranchMapper.mapFromBe )
                        }));
                        return true;
                    }else{
                        this.toast.error('No tiene accesos a esta plataforma');
                        return false;
                    }
                }
                return false;
            }).catch( err => {
                // this.toast.error('No se pudo recuperar la información del usuario');
                console.error(err);
                return Observable.of(false);
            });
        }
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
        return this.api.put('user/admin/update',{
        	password: entity.password,
        	first_name: entity.firstName,
            last_name: entity.lastName,
            ruc: entity.ruc,
            business_name: entity.businessName,
            cellphone: entity.phone
        })
        .map( resp => {
            let user = this.currentUser.value;
            let newUser = {
                id: resp.id,
                // email: resp.email,
                firstName: resp.first_name,
                lastName: resp.last_name,
                ruc: resp.ruc,
                phone: resp.cellphone,
                businessName: resp.business_name
            };
            console.log(resp);
            console.log(newUser);
            delete user.phone;
            delete user.businessName;
            this.setCurrentUser(Object.assign({},user,newUser));
            return this.currentUser.value;
        })
        .catch(err=>{
            this.toast.error('No se pudo actualizar sus datos');
            return Observable.of(undefined);
        })
    }
    add(entity: User): Observable<User> {
        throw new Error("Method not implemented.");
    }
    remove(entity: User): Observable<User> {
        throw new Error("Method not implemented.");
    }

    contactUs(name: string, email: string, message: string): Observable<boolean>{
        return this.api.post('webcontact/',{
            msg: message,
            full_name: name,
            email: email
        },undefined,false).map( resp => {
            if(resp[0]=="Correo envíado"){
                return true;
            }
            this.toast.error('No se pudo enviar su solicitud de contact');
            return false;
        })
    }
    
}