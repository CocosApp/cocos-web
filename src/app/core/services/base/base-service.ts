import { ApiService } from "../shared/api.service";
import { Injectable } from "@angular/core";
import { ToastService } from "../shared/toast.service";

@Injectable()
export class BaseService{
    
    constructor(protected api: ApiService, protected toast: ToastService ){
    }

}