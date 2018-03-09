import { Base } from './base/base.model';
import { Card } from './card.model';
import { Photo } from './shared/photo.model';
import { Branch } from './branch.model';

export class Discount extends Base<Discount>{

    description: string;
    name: string;
    card: Card;
    percentage: number;
    price: number;
    photoList: Photo[];
    termsAndConditions: string;
    isOwner: boolean;
    branch: Branch

}