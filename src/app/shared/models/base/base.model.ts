export class Base<T>{
    id?: string;

    constructor(partial?: Partial<T>){
        Object.assign(this, partial);
    }
}