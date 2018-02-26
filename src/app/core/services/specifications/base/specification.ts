export abstract class Specification<T>{
    evaluate(entity: T): boolean{
        return true;
    }
}

export class EntityByIdSpecification<T> extends Specification<T>{

    constructor(public id: number){
        super();
    }

    evaluate(entity: T): boolean {
        throw new Error("Method not implemented.");
    }
    
}