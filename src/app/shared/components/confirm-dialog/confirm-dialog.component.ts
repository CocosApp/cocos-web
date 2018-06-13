import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  message: string;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { 
    Object.assign(this,data);
  }

  ngOnInit() {
  }

}
