import { BaseService } from './base/base-service';
import { CrudService } from './contracts/crud-service';
import { Branch } from '../../shared/models/branch.model';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

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
        throw new Error("Method not implemented.");
    }
    remove(entity: Branch): Observable<Branch> {
        throw new Error("Method not implemented.");
    }

}