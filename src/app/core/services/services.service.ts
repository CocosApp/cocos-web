import { BaseService } from './base/base-service';
import { CrudService } from './contracts/crud-service';
import { Service } from '../../shared/models/service.model';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

@Injectable()
export class ServicesService extends BaseService implements CrudService<Service>{
    
    get(specification?: Specification<Service>): Observable<Service[]> {
        return Observable.of([
            new Service({
                id: 1,
                name: 'Servicio X',
            }),
            new Service({
                id: 2,
                name: 'Servicio X',
            }),
            new Service({
                id: 3,
                name: 'Servicio X',
            }),
            new Service({
                id: 4,
                name: 'Servicio X',
            })
        ]);
    }
    update(entity: Service): Observable<Service> {
        throw new Error("Method not implemented.");
    }
    add(entity: Service): Observable<Service> {
        throw new Error("Method not implemented.");
    }
    remove(entity: Service): Observable<Service> {
        throw new Error("Method not implemented.");
    }

}