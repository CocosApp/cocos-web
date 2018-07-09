import { BaseService, DjangoPagination } from './base/base-service';
import { CrudService } from './contracts/crud-service';
import { Discount } from '../../shared/models/discount.model';
import { Specification, EntityByIdSpecification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { DiscountMapper } from './mappers/discount.mapper';
import { UsersService } from './users.service';
import { ToastService } from './shared/toast.service';
import { ApiService } from './shared/api.service';
import { User } from '../../shared/models/user.model';
import { BranchMapper } from './mappers/branch.mapper';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DiscountsService extends BaseService implements CrudService<Discount>{
    
    currentUser: User;

    constructor(private users: UsersService, toast: ToastService, api: ApiService){
        super(api,toast);
        this.users.getCurrentUser().subscribe( u => this.currentUser = u );
    }

    get(specification?: Specification<Discount>): Observable<Discount[]> {
        // console.log(specification);
        if( specification instanceof EntityByIdSpecification ){
            // debugger;
            // let observables = this.currentUser.branchList.map(
            //     b => this.api.get(`admin/restaurant/${b.id}/discount/listcreate`)
            //     .map( (resp: DjangoPagination) => (resp.results[0].discount || []).map( DiscountMapper.mapFromBe )
            // ));
            // return Observable.forkJoin(...observables).map( results => {
            //     console.log([].concat(...results));
            //     return [].concat(...results).filter( d => d.id == specification.id );
            // })
            return this.api.get(`discount/admin/CRUD/${specification.id}`)
            .map((resp) => {
                return [DiscountMapper.mapFromBe(resp)];
            });
        }
        let observables = this.currentUser.branchList.map(
            b => this.api.get(`admin/restaurant/${b.id}/discount/listcreate`)
            .map( (resp: DjangoPagination) => (resp.results[0].discount || []).map( DiscountMapper.mapFromBe )
        ));
        return observables.length > 0 ?
         Observable.forkJoin(...observables).map( results => {
            // console.log(results);
            // return [].concat(...results);
            let discounts = [].concat(...results);
            let discountsIds = [];     
            return discounts.filter( d => {
                if( discountsIds.indexOf(d.id) < 0 ){
                    discountsIds.push(d.id)
                    return true;
                }
                return false;
            });
        }) : 
        Observable.of([]);
        // return this.api.get('discount/list/')
        // .map((resp: DjangoPagination) => {
        //     return resp.results.map( DiscountMapper.mapFromBe );
        // })
    }
    update(entity: Discount): Observable<Discount> {
        let resDiscount: any;
        return this.api.put(`discount/admin/CRUD/${entity.id}`,DiscountMapper.mapToBe(entity))
        .map((resp) => {
            return DiscountMapper.mapFromBe(resp);
        })
        .flatMap( updated => {
            if(updated){
                let allBranches = entity.allBranches||[];
                let previousBranchesIds = entity.previousBranches.map( b => b.id );
                let currentBranchesIds = entity.branches.map( b => b.id );
                let assignObservables = allBranches
                .filter( b => previousBranchesIds.indexOf(b.id) < 0 )
                .map( b => this.api.post(`admin/discount/${entity.id}/assign/restaurant`,{
                    restaurants: [b.id]
                }));
                let unassingObservables = allBranches
                .filter( b => previousBranchesIds.indexOf(b.id) >= 0 && currentBranchesIds.indexOf(b.id) < 0 )
                .map( b => this.api.post(`admin/discount/${entity.id}/unassign/restaurant`,{
                    restaurant_id: b.id
                }));
                let summaryObservables = assignObservables.concat(...unassingObservables);
                if(summaryObservables.length == 0){
                    return Observable.of(updated);        
                }
                return Observable.forkJoin(...summaryObservables)
                .map( results => {
                    return updated;        
                });
            }
            return Observable.of(updated);
        })
        // .flatMap( updated => {
        //     if(updated){
        //         return this.api.get('admin/list/restaurantdiscount',{
        //             params: new HttpParams()
        //                 .append('restaurant',entity.previousBranch.id.toString())
        //                 .append('discount',entity.id.toString())
        //         })
        //     }
        //     return Observable.of(undefined);
        // })
        // .flatMap( (resp: DjangoPagination) => {
        //     if(!!resp && !!resp.results && resp.results.length > 0){
        //         resDiscount = resp.results.find( r => !!r.restaurant && !!r.discount 
        //             && r.restaurant.id == entity.previousBranch.id && r.discount.id == entity.id );
        //         if(!!resDiscount){                    
        //             return this.api.delete(`admin/restaurant/${resDiscount.id}/discount`)
        //             .flatMap( resp => {
        //                 return this.api.post(`admin/restaurant/${entity.branch.id}/discount/listcreate`,{
        //                     discount: entity.id
        //                 });
        //             })
        //         }else{
        //             // this.toast.error('No se pudo actualizar el descuento')
        //             // return Observable.of(undefined);
        //             return this.api.post(`admin/restaurant/${entity.branch.id}/discount/listcreate`,{
        //                 discount: entity.id
        //             });
        //         }
        //     }
        //     // this.toast.error('No se pudo actualizar el descuento')
        //     return Observable.of(undefined);
        // })
        .map((resp) => {
            return entity;
        })
        .catch( err => {
            console.error(err);
            this.toast.error('No se pudo actualizar el descuento')
            return Observable.of(undefined);
        });
        
    }
    add(entity: Discount): Observable<Discount> {
        return this.api.post('discount/create',DiscountMapper.mapToBe(entity))
        .map((resp) => {
            return DiscountMapper.mapFromBe(resp);
        })
        .flatMap(created=>{
            if(created){
                // return this.api.post(`admin/restaurant/${entity.branch.id}/discount/listcreate`,{
                //     discount: created.id
                // })
                // .map( resp => new Discount() )
                // .catch( err => Observable.of(undefined) )
                return this.api.post(`admin/discount/${created.id}/assign/restaurant`,{
                    restaurants: (entity.branches||[]).map( b => b.id)
                })
                .map( results => {
                    return Observable.of(created);
                })
            }
            return Observable.of(undefined);
        })
        .catch(err => {
            this.toast.error('No se pudo crear el descuento');
            return Observable.of(undefined);
        });
    }
    remove(entity: Discount): Observable<Discount> {
        return this.api.delete(`discount/admin/CRUD/${entity.id}`)
        .map((resp) => {
            return entity;
        });
    }

}