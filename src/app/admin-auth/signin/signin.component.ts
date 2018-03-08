import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinFG: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
  private users: UsersService) { 
    this.signinFG = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  signin(){
    if(this.signinFG.valid){
      this.users.login( this.signinFG.value.email, this.signinFG.value.password )
      .subscribe(couldLogin=>{
        if(couldLogin){
          this.router.navigateByUrl('/admin');
        }
      })
    }
  }

}
