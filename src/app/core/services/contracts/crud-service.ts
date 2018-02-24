import { Specification } from "../specifications/base/specification";
import { Observable } from "rxjs/Observable";
import { Base } from "../../../shared/models/base/base.model";

export interface CrudService<T> extends Base<T>{

    get(specification?: Specification<T>): Observable<T[]>;

    update(entity: T): Observable<T>;

    add(entity: T): Observable<T>;

    remove(entity: T): Observable<T>;
}