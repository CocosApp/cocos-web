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
    branch: Branch;
    branches: Branch[];
    finishAt: Date;
    promotion: string;

    //FOR CRUD PURPOUSES
    previousBranch: Branch;
    previousBranches: Branch[];
    get allBranches(): Branch[]{
        let branchesIds = [];     
        return (this.branches.concat(...this.previousBranches)).filter( b => {
            if( branchesIds.indexOf(b.id) < 0 ){
                branchesIds.push(b.id)
                return true;
            }
            return false;
        });
    }

}