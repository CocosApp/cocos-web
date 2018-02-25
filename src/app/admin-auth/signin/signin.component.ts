import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinFG: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.signinFG = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  signin(){
    this.router.navigateByUrl('/admin');
  }

}
