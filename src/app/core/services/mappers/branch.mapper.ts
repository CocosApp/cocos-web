import { Branch } from "../../../shared/models/branch.model";
import { Category } from "../../../shared/models/category.model";
import { Schedule } from "../../../shared/models/schedule.model";
import { Discount } from "../../../shared/models/discount.model";
import { Photo } from "../../../shared/models/shared/photo.model";
import { Service } from "../../../shared/models/service.model";
import { DiscountMapper } from "./discount.mapper";

export class BranchMapper{

    static mapFromBe(be: any): Branch {
        return new Branch({
            id: be.id,
            name: be.name,
            ruc: be.ruc,
            longitude: be.longitude,
            latitude: be.latitude,
            address: be.address,
            whatsapp: be.whatsapp ? be.whatsapp.startsWith('+51')? be.whatsapp.replace('+51','') : be.whatsapp : '',
            facebookPageUrl: be.facebook,
            scheduleList: (be.schedule || []).map( i => new Schedule({
                id: i.id,
                description: i.name
            })),
            discountList: (be.discount || []).map( i => DiscountMapper.mapFromBe(i)),
            serviceList: (be.service || []).map( i => new Service({
                id: i.id,
                name: i.name
            })),
            menuPublicUrl: be.food_letter,
            phoneList: [be.mobile,be.mobile2],
            photoList: [be.photo1,be.photo2,be.photo3].filter(p => p).map((p,id) => new Photo({ id: id+1, imageUrl: p })),
            subcategoryList: (be.subcategory || []).map( i => new Category({
                id: i.id,
                name: i.name
            }))
        });
    }

    static mapToBe(entity: Branch) {
        let formData = new FormData();
        entity.whatsapp = entity.whatsapp.toString();
        entity.id && formData.append('id',entity.id.toString());
        entity.name && formData.append('name',entity.name);
        entity.ruc && formData.append('ruc',entity.ruc);
        entity.longitude && formData.append('longitude',entity.longitude.toString());
        entity.latitude && formData.append('latitude',entity.latitude.toString());
        entity.address && formData.append('address',entity.address);
        entity.facebookPageUrl && formData.append('facebook',entity.facebookPageUrl);
        formData.append('is_enable','false');
        if(entity.subcategoryList){
            entity.subcategoryList.forEach( i => formData.append('subcategory',i.id.toString()));
        }
        if(entity.scheduleList){
            entity.scheduleList.forEach( i => formData.append('schedule',i.id.toString()));
        }
        if(entity.discountList){
            entity.discountList.forEach( i => formData.append('discount',i.id.toString()));
        }
        if(entity.serviceList){
            entity.serviceList.forEach( i => formData.append('service',i.id.toString()));
        }
        // entity.subcategoryList && formData.append('subcategory',JSON.stringify(entity.subcategoryList.extractId().join(',')));
        // entity.scheduleList && formData.append('schedule',JSON.stringify(entity.scheduleList.extractId().join(',')));
        // entity.discountList && formData.append('discount',JSON.stringify(entity.discountList.extractId().join(',')));
        // entity.serviceList && formData.append('service',JSON.stringify(entity.serviceList.extractId().join(',')));
        entity.menu && formData.append('food_letter',entity.menu, entity.menu.name);
        entity.phoneList[0] && formData.append('mobile', entity.phoneList[0]);
        entity.phoneList[1] && formData.append('mobile2', entity.phoneList[1]);
        console.log(entity.phoneList);
        entity.whatsapp && formData.append('whatsapp',entity.whatsapp.startsWith('+51')? entity.whatsapp : '+51'+entity.whatsapp);
        if(entity.photoList[0] && entity.photoList[0].image){
            formData.append('photo1',entity.photoList[0].image, entity.photoList[0].image.name);
        }else if(entity.photoList[0] && entity.photoList[0].forDelete){
            formData.append('photo1','');
        }
        if(entity.photoList[1] && entity.photoList[1].image){
            formData.append('photo2',entity.photoList[1].image, entity.photoList[1].image.name);
        }else if(entity.photoList[1] && entity.photoList[1].forDelete){
            formData.append('photo2','');
        }
        if(entity.photoList[2] && entity.photoList[2].image){
            formData.append('photo3',entity.photoList[2].image, entity.photoList[2].image.name);
        }else if(entity.photoList[2] && entity.photoList[2].forDelete){
            formData.append('photo3','');
        }
        return formData
    }    
}