import { Validator, AbstractControl } from "@angular/forms";

export class TypeOfValidator implements Validator{
    
    validate(c: AbstractControl): { [key: string]: any; } {
        throw new Error("Method not implemented.");
    }
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }
    
    static buildValidator(type: new() => any){
        return (c: AbstractControl) => {
            if( !c.value || (c.value && c.value.constructor.name != type.name) ){
                return { typeMissmatch: true }; 
            }
            return null;
        };
    }
}