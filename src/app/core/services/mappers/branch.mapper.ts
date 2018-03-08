import { Branch } from "../../../shared/models/branch.model";

export class BranchMapper{
    static mapFromBe(be: any): Branch {
        throw new Error("Method not implemented.");
    }
    static mapToBe(entity: Branch) {
        let formData = new FormData();
        entity.id && formData.append('id',entity.id.toString());
        entity.name && formData.append('name',entity.name);
        entity.ruc && formData.append('ruc',entity.ruc);
        entity.longitude && formData.append('longitude',entity.longitude.toString());
        entity.latitude && formData.append('latitude',entity.latitude.toString());
        entity.address && formData.append('address',entity.address);
        entity.whatsapp && formData.append('whatsapp',entity.whatsapp);
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
        entity.phoneList[0] && formData.append('mobile',51+entity.phoneList[0]);
        entity.photoList[0] && formData.append('photo1',entity.photoList[0].image, entity.photoList[0].image.name);
        entity.photoList[1] && formData.append('photo2',entity.photoList[1].image, entity.photoList[1].image.name);
        entity.photoList[2] && formData.append('photo3',entity.photoList[2].image, entity.photoList[2].image.name);
        return formData
    }    
}