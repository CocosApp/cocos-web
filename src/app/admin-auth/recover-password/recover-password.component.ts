import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  recoverPasswordFG: FormGroup;
  sent: boolean = false;

  constructor(private dialogRef: MatDialogRef<RecoverPasswordComponent>,
  private fb: FormBuilder, private users: UsersService) { 
    this.recoverPasswordFG = this.fb.group({
      email: ['',Validators.email]
    });
  }

  ngOnInit() {
  }

  onConfirm(){
    if(this.recoverPasswordFG.valid){
      this.users.recoverPassword(this.recoverPasswordFG.value.email).subscribe( couldRecover => {
        if(couldRecover){
          this.sent = true;
        }
      });
    }
  }
}
