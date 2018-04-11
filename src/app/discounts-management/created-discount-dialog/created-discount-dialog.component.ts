import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-created-discount-dialog',
  templateUrl: './created-discount-dialog.component.html',
  styleUrls: ['./created-discount-dialog.component.scss']
})
export class CreatedDiscountDialogComponent implements OnInit {

  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { 
    this.title = data.title;
  }

  ngOnInit() {
  }

}
