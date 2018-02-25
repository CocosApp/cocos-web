import { Base } from './base/base.model';

export class User extends Base<User>{
    
    firstName: string;
    lastName: string;
    ruc: string;
    businessName: string;
    comments: string;
    password: string;
    email: string;
    phone: string;
}
