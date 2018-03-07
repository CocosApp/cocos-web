interface Array<T>{
    findById(id): T;
    extractId(): (number|string)[];
}

Array.prototype.findById = function(id: number){
    return this.find( e => e.id == id );
}

Array.prototype.extractId = function(){
    return this.map( i => i.id );
}