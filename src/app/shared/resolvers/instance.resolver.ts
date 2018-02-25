import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { UsersService } from "../../core/services/users.service";
import { Observable } from "rxjs/Observable";
import { UserByIdSpecification } from "../../core/services/specifications/user.specification";
import { User } from "../../shared/models/user.model";
import { Injectable, Optional } from "@angular/core";
import { CrudService } from "../../core/services/contracts/crud-service";
import { EntityByIdSpecification } from "../../core/services/specifications/base/specification";
import { Base } from '../models/base/base.model';
import { Branch } from '../models/branch.model';
import { BranchesService } from '../../core/services/branches.service';

export class BaseInstanceResolver<T extends Base<T>> implements Resolve<T> {

    private crud: CrudService<T>;
    private entityByIdSpecificationClass: new (id: number) => EntityByIdSpecification<T>;

    constructor(){

    }

    init(crud: CrudService<T>,
        entityByIdSpecificationClass?: new (id: number) => EntityByIdSpecification<T>){
        this.crud = crud;
        this.entityByIdSpecificationClass = entityByIdSpecificationClass;
    }

    resolve(route: ActivatedRouteSnapshot):Observable<T>{
        let id = route.params['id'];
        if( id == 'agregar' ){
            return undefined;
        }else{
            return this.crud.get( 
                this.entityByIdSpecificationClass ? 
                new this.entityByIdSpecificationClass(id) :
                new EntityByIdSpecification<T>(id) ).map( es => es[0]).first()
        }
    }
    
}

@Injectable()
export class InstanceResolverForBranch extends BaseInstanceResolver<Branch>{

    constructor(branches: BranchesService){
        super();
        this.init(branches);
    }

}   