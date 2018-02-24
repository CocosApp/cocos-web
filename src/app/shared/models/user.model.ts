import { Base } from './base/base.model';

export class User extends Base<User>{
    
    hasActiveOrder: boolean;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: string;
    photoUrl: string;
}
