import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../core/services/branches.service';
import { Branch } from '../../shared/models/branch.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastService } from '../../core/services/shared/toast.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  branchList: Branch[];

  constructor(private branches: BranchesService, private dialog: MatDialog, private toast: ToastService,
    private sanitizer: DomSanitizer) { 
    this.load();
  }

  ngOnInit() {
  }

  load(){
    this.branches.get().subscribe( bs => {
      this.branchList = bs
    } );
  }

  getBackgroundImage(branch: Branch){
    let backgroundUrl = '/assets/images/branch-placeholder.jpg';
    if( branch.photoList 
      && branch.photoList.length > 0 
      && branch.photoList[0].imageUrl != ''
      && branch.photoList[0].imageUrl != undefined ){
      backgroundUrl = branch.photoList[0].imageUrl;
    }
    return this.sanitizer.bypassSecurityTrustStyle(`url(${backgroundUrl})`);
  }

  onDelete(branch: Branch){
    (this.dialog.open(ConfirmDialogComponent,{
      data: {
        title: `Eliminar el restaurante ${branch.name}?`,
        message: 'Al eliminarse, ningún usuario podrá visualizar este restaurante desde la aplicación.'
      }
    })).afterClosed().subscribe( confirm => {
      if(confirm){
        this.branches.remove(branch).subscribe( branch => {
          if(!!branch){
            this.toast.success('Restaurante eliminado con éxito');
            this.load();
          }
        })
      }
    })
  }
}
