import { Validator, AbstractControl } from "@angular/forms";

export class ArrayLengthValidator implements Validator {
    
    constructor(private min:number,private max:number){
        
    }

    validate(c: AbstractControl): { [key: string]: any; } {
        if( !c.value ||  ( (c.value || []).length < this.min || (c.value || []).length > this.max) ){
            return { length: true }
        }
      return undefined;
    }

    registerOnValidatorChange?(fn: () => void): void {
        
    }

}