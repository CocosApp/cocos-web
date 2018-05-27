import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { ToastService } from '../../core/services/shared/toast.service';
import { LengthValidator } from '../../shared/validators/length.validator';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { EqualsToValidator } from '../../shared/validators/equals-to.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  profileFG: FormGroup;
  changePasswordFG: FormGroup;
  userSubscription: Subscription;

  constructor(private fb: FormBuilder, private users: UsersService, private toast: ToastService) { 
    this.profileFG = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      ruc: ['',[Validators.required, new LengthValidator(11)]],
      businessName: ['',[Validators.required]],
      // comments: ['',[Validators.required]],
      // password: ['',[Validators.required]],
      // confirmPassword: ['',[EqualsToValidator.buildValidator('password')]],
      email: ['',[Validators.email]],
      phone: ['', [new LengthValidator(9)]],
    });
    this.changePasswordFG = this.fb.group({
      oldPassword: ['',Validators.required],
      newPassword: ['',Validators.required],
      confirmNewPassword: ['', EqualsToValidator.buildValidator('newPassword')]
    })
    this.userSubscription = this.users.getCurrentUser().subscribe( u => {
      // console.log(u);
      if(u){
        this.profileFG.patchValue(u);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onConfirm(){
    if(this.profileFG.valid){
      this.users.update(new User(this.profileFG.value)).subscribe( u => {
        if(u){
          this.toast.success('Sus datos han sido actualizados');
        }
      })
    }else{
      this.toast.warning('Hay campos requeridos sin completar');
    }
  }

  onChangePassword(){
    if(this.changePasswordFG.value.newPassword != this.changePasswordFG.value.confirmNewPassword){
      this.toast.warning('Las contraseñas no coinciden');
      return ;
    }
    if(this.changePasswordFG.valid){
      this.users.changePassword(this.changePasswordFG.value.oldPassword, this.changePasswordFG.value.newPassword)
      .subscribe( success => {
        if(success){
          this.toast.success('Contraseña cambiada con éxito');
        }
      })
    }
  }

}
