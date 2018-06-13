import { BaseService, DjangoPagination } from './base/base-service';
import { CrudService } from './contracts/crud-service';
import { Branch } from '../../shared/models/branch.model';
import { Specification, EntityByIdSpecification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { BranchMapper } from './mappers/branch.mapper';

@Injectable()
export class BranchesService extends BaseService implements CrudService<Branch>{
    
    get(specification?: Specification<Branch>): Observable<Branch[]> {
        if( specification instanceof EntityByIdSpecification ){
            return this.api.get(`admin/restaurant/RUD/${specification.id}`)
            .map( resp => {
                return [
                    BranchMapper.mapFromBe(resp)
                ];
            });
        }
        return this.api.get('user/admin/restaurant/listcreate')
        .map( (resp: DjangoPagination) => {
            return resp.results.map( be => BranchMapper.mapFromBe(be.restaurant) );
        })
        .catch( err => {
            this.toast.error(`No se pudo cargar los restaurantes: ${err.message}`)
            return Observable.of([]);
        });
    }
    update(entity: Branch): Observable<Branch> {
        return this.api.put(`admin/restaurant/RUD/${entity.id}`,BranchMapper.mapToBe(entity))
        .map( resp => {
            return BranchMapper.mapFromBe(resp);
        })
        .catch( err => {
            this.toast.error('No se pudo actualizar el restaurante')
            return Observable.of(undefined);
        });
    }
    add(entity: Branch): Observable<Branch> {
        return this.api.post('admin/create/restaurant', BranchMapper.mapToBe(entity))
            .map( resp  => {
                return new Branch({ id: resp.id });
            })
            .catch( err => {
                this.toast.error('No se pudo crear el restaurante');
                return Observable.of(undefined);
            })
            .flatMap(created =>{
                if(created){
                    return this.api.post('user/admin/restaurant/listcreate',{
                        restaurant: created.id
                    })
                    .map(resp =>{
                        if(resp){
                            return Observable.of(new Branch({}))
                        }
                        return Observable.of(undefined);
                    })
                    .catch( err => {
                        this.toast.error('No se pudo asignar el restaurante a su usuario');
                        return Observable.of(undefined);
                    })
                }else{
                    return Observable.of(undefined);
                }
            })
    }
    remove(entity: Branch): Observable<Branch> {
        return this.api.delete(`admin/restaurant/RUD/${entity.id}`)
        .map( resp => {
            return entity;
        })
        .catch( err => {
            this.toast.error('No se pudo eliminar el restaurante')
            return Observable.of(undefined);
        });;
    }

    
}