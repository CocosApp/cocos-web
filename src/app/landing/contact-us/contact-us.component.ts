import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { ToastService } from '../../core/services/shared/toast.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactFG: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private users: UsersService,
  private toast: ToastService) { 
    this.contactFG = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.email]],
      message: ['',[Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSend(){
    if(this.contactFG.valid){
      this.loading = true;
      this.users.contactUs(
        this.contactFG.value.name,
        this.contactFG.value.email,
        this.contactFG.value.message
      ).subscribe( (success)=>{
        this.loading = false;
        if(success){
          this.toast.success('Solicitud enviada!');
        }
      })
    }
  }
}
