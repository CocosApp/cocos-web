import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Branch } from '../../shared/models/branch.model';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent implements OnInit {

  branch: Branch;
  branchFG: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.branchFG = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      ruc: ['',[Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
      businessName: ['',[Validators.required]],
      comments: ['',[]],
      password: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone: ['',[Validators.required]],
    })
  }

  ngOnInit(){

  }
}
