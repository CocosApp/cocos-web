import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EqualsToValidator } from '../../shared/validators/equals-to.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupFG: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.signupFG = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      ruc: ['',[Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
      businessName: ['',[Validators.required]],
      comments: ['',[]],
      password: ['',[Validators.required]],
      confirmPassword: ['',[EqualsToValidator.buildValidator('password')]],
      email: ['',[Validators.required]],
      phone: ['',[Validators.required]],
    })
  }

  ngOnInit() {
  }

}
