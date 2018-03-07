import { Branch } from "../../../shared/models/branch.model";

export class BranchMapper{
    static mapFromBe(be: any): Branch {
        throw new Error("Method not implemented.");
    }
    static mapToBe(entity: Branch) {
        let formData = new FormData();
        entity.id && formData.append('id',entity.id.toString());
        entity.subcategoryList && formData.append('subcategory',JSON.stringify(entity.subcategoryList.extractId()));
        entity.name && formData.append('name',entity.name);
        entity.ruc && formData.append('ruc',entity.ruc);
        entity.longitude && formData.append('longitude',entity.longitude.toString());
        entity.latitude && formData.append('latitude',entity.latitude.toString());
        entity.address && formData.append('address',entity.address);
        entity.whatsapp && formData.append('whatsapp',entity.whatsapp);
        entity.facebookPageUrl && formData.append('facebook',entity.facebookPageUrl);
        entity.scheduleList && formData.append('schedule',JSON.stringify(entity.scheduleList.extractId()));
        entity.discountList && formData.append('discount',JSON.stringify(entity.discountList.extractId()));
        entity.subcategoryList && formData.append('discount',JSON.stringify(entity.subcategoryList.extractId()));
        entity.serviceList && formData.append('discount',JSON.stringify(entity.serviceList.extractId()));
        entity.menu && formData.append('food_letter',entity.menu, entity.menu.name);
        entity.phoneList[0] && formData.append('mobile',entity.phoneList[0]);
        entity.photoList[0] && formData.append('photo1',entity.photoList[0].image, entity.photoList[0].image.name);
        entity.photoList[1] && formData.append('photo2',entity.photoList[1].image, entity.photoList[1].image.name);
        entity.photoList[2] && formData.append('photo3',entity.photoList[2].image, entity.photoList[2].image.name);
        return formData
    }    
}