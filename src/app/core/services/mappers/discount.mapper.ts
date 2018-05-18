import { Discount } from "../../../shared/models/discount.model";
import { Card } from "../../../shared/models/card.model";
import { Photo } from "../../../shared/models/shared/photo.model";
import { Branch } from "../../../shared/models/branch.model";

export class DiscountMapper{

    static mapFromBe(be: any): Discount {
        return new Discount({
            id: be.id,
            name: be.name,
            card: be.card? new Card({id:be.card/*,name: be.card.name*/}) : undefined,
            percentage: be.porc,
            price: be.price,
            photoList: be.photo? [new Photo({ id:9999, imageUrl: be.photo })] : [],
            description: be.descrip,
            isOwner: be.is_owner,
            termsAndConditions: be.terms_condition,
            branch: be.restaurants && be.restaurants.length > 0? 
                new Branch({ id: be.restaurants[0] }) : undefined,
            previousBranch: be.restaurants && be.restaurants.length > 0? 
            new Branch({ id: be.restaurants[0] }) : undefined,
            finishAt: Date.fromString(be.finished_at),
            promotion: be.promotion
        });
    }

    static mapToBe(entity: Discount) {
        let formData = new FormData();
        entity.id && formData.append('id',entity.id.toString());
        // entity.card && formData.append('card',entity.card.id.toString());
        formData.append('card', entity.card? entity.card.id.toString() : '');
        formData.append('finished_at', entity.finishAt.toLocaleDateYearFirst()+' 00:00:00.000000-05:00' );
        // formData.append('is_owner',entity.card ? 'false' : 'true');
        entity.description && formData.append('descrip',entity.description);
        entity.name && formData.append('name',entity.name);
        formData.append('porc',(entity.percentage || 0).toString());
        formData.append('price',(entity.price || 0).toString());
        formData.append('promotion',entity.promotion);
        entity.termsAndConditions && formData.append('terms_condition',entity.termsAndConditions);
        console.log(entity.photoList);
        if(entity.photoList && entity.photoList[0] && entity.photoList[0].image){
            formData.append('photo',entity.photoList[0].image, entity.photoList[0].image.name);
        }else if(entity.photoList[0] && entity.photoList[0].forDelete){
            formData.append('photo','');
        }
        return formData
    }    
}