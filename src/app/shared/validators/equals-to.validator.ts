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
                if( c.value == c.parent.get(otherControlName).value ){
                    return null;
                }else{
                    return { equalsTo: true };
                }
            }       
        };
    }

}