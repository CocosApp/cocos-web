import { Injectable } from "@angular/core";
// import { Ng2IzitoastService } from "ng2-izitoast";

@Injectable()
export class ToastService{

    // constructor( private toastDesignProvider: Ng2IzitoastService ){
        
    // }

    show(message: string, title?: string){
        // this.toastDesignProvider.show({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
    }

    info(message: string, title?: string){
        // this.toastDesignProvider.info({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
    }

    success(message: string, title?: string){
        // this.toastDesignProvider.success({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
    }

    warning(message: string, title?: string){
        // this.toastDesignProvider.warning({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
    }

    error(message: string, title?: string){
        // this.toastDesignProvider.error({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
    }

}