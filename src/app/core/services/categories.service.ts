import { BaseService } from './base/base-service';
import { CrudService } from './contracts/crud-service';
import { Category } from '../../shared/models/category.model';
import { Specification } from './specifications/base/specification';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

@Injectable()
export class CategoriesService extends BaseService implements CrudService<Category>{
    
    get(specification?: Specification<Category>): Observable<Category[]> {
        return Observable.of([
            new Category({
                id: 1,
                name: 'Categoría X',
            }),
            new Category({
                id: 2,
                name: 'Categoría X',
            }),
            new Category({
                id: 3,
                name: 'Categoría X',
            }),
            new Category({
                id: 4,
                name: 'Categoría X',
            })
        ]);
    }
    update(entity: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    add(entity: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    remove(entity: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }

}