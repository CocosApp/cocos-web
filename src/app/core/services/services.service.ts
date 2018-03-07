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
        return this.api.get('service/list').map( (resp: {results: any[]}) => {
            return resp.results.map( be => new Service({
                id: be.id,
                name: be.name
            }));
        });
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