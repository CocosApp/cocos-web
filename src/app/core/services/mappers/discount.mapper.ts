import { Discount } from "../../../shared/models/discount.model";
import { Card } from "../../../shared/models/card.model";
import { Photo } from "../../../shared/models/shared/photo.model";

export class DiscountMapper{

    static mapFromBe(be: any): Discount {
        return new Discount({
            id: be.id,
            name: be.name,
            card: be.card? new Card({id:be.card.id,name: be.card.name}) : undefined,
            percentage: be.porc,
            price: be.price,
            photoList: be.photo? [new Photo({ imageUrl: be.photo })] : [],
            description: be.desscrip,
            isOwner: be.is_owner,
            termsAndConditions: be.terms_condition
        });
    }

    static mapToBe(entity: Discount) {
        let formData = new FormData();
        entity.id && formData.append('id',entity.id.toString());
        entity.card && formData.append('card',entity.card.id.toString());
        formData.append('is_owner',entity.card ? 'false' : 'true');
        entity.description && formData.append('descrip',entity.description);
        entity.name && formData.append('name',entity.name);
        entity.percentage && formData.append('porc',entity.percentage.toString());
        entity.price && formData.append('price',entity.price.toString());
        entity.termsAndConditions && formData.append('terms_condition',entity.termsAndConditions);        
        if(entity.photoList && entity.photoList[0].image){
            formData.append('photo',entity.photoList[0].image, entity.photoList[0].image.name);
        }else if(entity.photoList[0] && entity.photoList[0].forDelete){
            formData.append('photo',null);
        }
        return formData
    }    
}