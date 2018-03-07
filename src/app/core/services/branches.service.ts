import { BaseService } from './base/base-service';
import { CrudService } from './contracts/crud-service';
import { Branch } from '../../shared/models/branch.model';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { BranchMapper } from './mappers/branch.mapper';

@Injectable()
export class BranchesService extends BaseService implements CrudService<Branch>{
    
    get(specification?: Specification<Branch>): Observable<Branch[]> {
        return Observable.of([
            new Branch({
                id: 1,
                name: 'Dinjo Inn San Martín de Porres',
            }),
            new Branch({
                id: 2,
                name: 'Dinjo Inn San Martín de Porres',
            }),
            new Branch({
                id: 3,
                name: 'Dinjo Inn San Martín de Porres',
            }),
            new Branch({
                id: 4,
                name: 'Dinjo Inn San Martín de Porres',
            })
        ]);
    }
    update(entity: Branch): Observable<Branch> {
        throw new Error("Method not implemented.");
    }
    add(entity: Branch): Observable<Branch> {
        return this.api.post('admin/create/restaurant', BranchMapper.mapToBe(entity))
            .map( resp  => {
                return Observable.of( new Branch({}));
            })
            .catch( err => {
                this.toast.error('No se pudo crear el restaurante');
                return Observable.of(undefined);
            })
    }
    remove(entity: Branch): Observable<Branch> {
        throw new Error("Method not implemented.");
    }

    
}