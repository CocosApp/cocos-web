import { Base } from './base/base.model';
import { Branch } from './branch.model';

export class User extends Base<User>{
    
    firstName: string;
    lastName: string;
    ruc: string;
    businessName: string;
    comments: string;
    password: string;
    email: string;
    phone: string;
    branchList: Branch[]; 
    
}
