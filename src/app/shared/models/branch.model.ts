import { Base } from './base/base.model';
import { Category } from './category.model';
import { Discount } from './discount.model';
import { Service } from './service.model';
import { Photo } from './shared/photo.model';
import { Schedule } from './schedule.model';

export class Branch extends Base<Branch>{

    name: string;
    ruc: string;
    subcategoryList: Category[];
    longitude: number;
    latitude: number;
    address: string;
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
    scheduleList: Schedule[];

}