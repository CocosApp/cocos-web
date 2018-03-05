import { Validator, AbstractControl } from "@angular/forms";

export class LocationValidator implements Validator {
    
    validate(c: AbstractControl): { [key: string]: any; } {
        if(c.parent){
            if( c.parent.get('latitude').valid && c.parent.get('longitude').valid ){
                return null;
            }else{
                return { location: true };
            }
        }else{
            return null;
        }
    }

}