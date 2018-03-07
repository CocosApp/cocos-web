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
        return this.api.get('subcategory/list').map( (resp: {results: any[]}) => {
            return resp.results.map( be => new Category({
                id: be.id,
                name: be.name
            }));
        });
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