import { BaseService } from './base/base-service';
import { CrudService } from './contracts/crud-service';
import { Schedule } from '../../shared/models/schedule.model';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

@Injectable()
export class SchedulesService extends BaseService implements CrudService<Schedule>{
    
    get(specification?: Specification<Schedule>): Observable<Schedule[]> {
        return this.api.get('schedule/list').map( (resp: {results: any[]}) => {
            return resp.results.map( be => new Schedule({
                id: be.id,
                description: be.name
            }));
        });
    }
    update(entity: Schedule): Observable<Schedule> {
        throw new Error("Method not implemented.");
    }
    add(entity: Schedule): Observable<Schedule> {
        throw new Error("Method not implemented.");
    }
    remove(entity: Schedule): Observable<Schedule> {
        throw new Error("Method not implemented.");
    }

}