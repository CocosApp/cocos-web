import { Base } from "./base/base.model";
import { Photo } from "./shared/photo.model";

export class Card extends Base<Card>{

    code: string;
    name: string;
    photo: Photo;
}