import { BaseService } from './base/base-service';
import { CrudService } from './contracts/crud-service';
import { Discount } from '../../shared/models/discount.model';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

@Injectable()
export class DiscountsService extends BaseService implements CrudService<Discount>{
    
    get(specification?: Specification<Discount>): Observable<Discount[]> {
        return Observable.of([
            new Discount({
                id: 1,
                name: 'Descuento en un lugar',
                description: 'Descuento X',
            }),
            new Discount({
                id: 2,
                name: 'Descuento en un lugar',
                description: 'Descuento X',
            }),
            new Discount({
                id: 3,
                name: 'Descuento en un lugar',
                description: 'Descuento X',
            }),
            new Discount({
                id: 4,
                name: 'Descuento en un lugar',
                description: 'Descuento X',
            })
        ]);
    }
    update(entity: Discount): Observable<Discount> {
        throw new Error("Method not implemented.");
    }
    add(entity: Discount): Observable<Discount> {
        throw new Error("Method not implemented.");
    }
    remove(entity: Discount): Observable<Discount> {
        throw new Error("Method not implemented.");
    }

}