export abstract class Specification<T>{
    abstract evaluate(entity: T): boolean;
}

export class EntityByIdSpecification<T> extends Specification<T>{

    constructor(public id: number){
        super();
    }

    evaluate(entity: T): boolean {
        throw new Error("Method not implemented.");
    }
    
}