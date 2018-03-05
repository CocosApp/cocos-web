import { Base } from '../base/base.model';

export class Photo extends Base<Photo>{

    image: any;
    imageUrl: string;
    forDelete: boolean;
    
}