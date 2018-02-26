import { Base } from './base/base.model';
import { Category } from './category.model';
import { Discount } from './discount.model';
import { Service } from './service.model';
import { Photo } from './shared/photo.model';

export class Branch extends Base<Branch>{

    name: string;
    ruc: string;
    subcategoryList: Category[];
    longitude: number;
    latitude: number;
    address: number;
    openTime: string;
    closeTime: string;
    discountList: Discount[];
    menu: any;
    menuPublicUrl: string;
    phoneList: string[];
    photoList: Photo[];
    whatsapp: string;
    facebookPageUrl: string;
    serviceList: Service[];

}