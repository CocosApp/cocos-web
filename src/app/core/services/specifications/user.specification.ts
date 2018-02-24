import { Specification, EntityByIdSpecification } from "./base/specification";
import { User } from "../../../shared/models/user.model";

export abstract class UserSpecification extends Specification<User>{

}

export class UserByIdSpecification extends EntityByIdSpecification<User>{

}