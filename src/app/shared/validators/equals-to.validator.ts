import { Validator, AbstractControl } from "@angular/forms";

export class EqualsToValidator implements Validator {
    
    validate(c: AbstractControl): { [key: string]: any; } {
        throw new Error("Method not implemented.");
    }

    registerOnValidatorChange?(fn: () => void): void {
        
    }

    static buildValidator(otherControlName: string){
        return (c: AbstractControl) => {
            if(c.parent){
                // c.parent.get(otherControlName).valueChanges.subscribe( () => {
                //     c.updateValueAndValidity();
                // });
                if( c.value == c.parent.get(otherControlName).value ){
                    return null;
                }else{
                    return { equalsTo: true };
                }
            }       
        };
    }

}