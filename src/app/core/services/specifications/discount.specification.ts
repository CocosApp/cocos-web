import { Specification } from "./base/specification";
import { Discount } from "../../../shared/models/discount.model";
import { Branch } from "../../../shared/models/branch.model";

export abstract class DiscountSpecification extends Specification<Discount>{

}

export class DiscountsByBranchSpecification extends DiscountSpecification{

    constructor(public branch: Branch){
        super();
    }
    
}