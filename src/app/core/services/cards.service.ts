import { BaseService, DjangoPagination } from './base/base-service';
import { CrudService } from './contracts/crud-service';
import { Card } from '../../shared/models/card.model';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Photo } from '../../shared/models/shared/photo.model';

@Injectable()
export class CardsService extends BaseService implements CrudService<Card>{
    
    get(specification?: Specification<Card>): Observable<Card[]> {
        return this.api.get('admin/card/list').map( (resp: DjangoPagination) =>{
            return resp.results.map( be => new Card({
                id: be.id,
                name: be.name,
                photo: new Photo({ imageUrl: be.photo })
            }) )
        });
    }
    update(entity: Card): Observable<Card> {
        throw new Error("Method not implemented.");
    }
    add(entity: Card): Observable<Card> {
        throw new Error("Method not implemented.");
    }
    remove(entity: Card): Observable<Card> {
        throw new Error("Method not implemented.");
    }

}