import { BaseService } from './base/base-service';
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
        return Observable.of([
            new Card({
                id: 1,
                name: 'Tarjeta X',
                photo: new Photo({ imageUrl: '/assets/images/card-placeholder.svg' })
            }),
            new Card({
                id: 2,
                name: 'Tarjeta X',
                photo: new Photo({ imageUrl: '/assets/images/card-placeholder.svg' })
            }),
            new Card({
                id: 3,
                name: 'Tarjeta X',
                photo: new Photo({ imageUrl: '/assets/images/card-placeholder.svg' })
            }),
            new Card({
                id: 4,
                name: 'Tarjeta X',
                photo: new Photo({ imageUrl: '/assets/images/card-placeholder.svg' })
            })
        ]);
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