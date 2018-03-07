import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
// import { Ng2IzitoastService } from "ng2-izitoast";

@Injectable()
export class ToastService{

    constructor( private toastDesignProvider: MatSnackBar ){
        
    }

    show(message: string, title?: string){
        // this.toastDesignProvider.show({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
        this.toastDesignProvider.open(message,undefined,
            { verticalPosition: 'top', horizontalPosition: 'center', duration: 3000 })
    }

    info(message: string, title?: string){
        // this.toastDesignProvider.info({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
        this.toastDesignProvider.open(message,'INFO',
            { verticalPosition: 'top', horizontalPosition: 'center', duration: 3000 })
    }

    success(message: string, title?: string){
        // this.toastDesignProvider.success({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
        this.toastDesignProvider.open(message,'SUCCESS',
        { verticalPosition: 'top', horizontalPosition: 'center', duration: 3000 })
    }

    warning(message: string, title?: string){
        // this.toastDesignProvider.warning({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
        this.toastDesignProvider.open(message,'WARNING',
        { verticalPosition: 'top', horizontalPosition: 'center', duration: 3000 })
    }

    error(message: string, title?: string){
        // this.toastDesignProvider.error({
        //     title: title || '',
        //     message: message,
        //     layout: 2,
        //     position: 'topCenter'
        // })
        this.toastDesignProvider.open(message,'ERROR',
        { verticalPosition: 'top', horizontalPosition: 'center', duration: 3000 })
    }

}