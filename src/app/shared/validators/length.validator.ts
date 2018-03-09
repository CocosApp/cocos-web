import { Validator, AbstractControl } from "@angular/forms";

export class LengthValidator implements Validator {
    
    lengths: number[];

    constructor(...lengths: number[]){
        this.lengths = lengths
    }

    validate(c: AbstractControl): { [key: string]: any; } {
      if( !c.value || !this.lengths.includes(c.value.toString().length)){
          return { length: true }
      }
      return undefined;
    }

    registerOnValidatorChange?(fn: () => void): void {
        
    }

}