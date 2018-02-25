import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../core/services/branches.service';
import { Branch } from '../../shared/models/branch.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {

  branchList: Branch[];

  constructor(private branches: BranchesService,
    private sanitizer: DomSanitizer) { 
    this.branches.get().subscribe( bs => this.branchList = bs );
  }

  ngOnInit() {
  }

  getBackgroundImage(branch: Branch){
    let backgroundUrl = '/assets/images/branch-placeholder.jpg';
    if( branch.photoList 
      && branch.photoList.length > 0 
      && branch.photoList[0].publicUrl != ''
      && branch.photoList[0].publicUrl != undefined ){
      backgroundUrl = branch.photoList[0].publicUrl;
    }
    return this.sanitizer.bypassSecurityTrustStyle(`url(${backgroundUrl})`);
  }
}
