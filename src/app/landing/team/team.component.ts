import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: any[] = [
    {
      name: 'Mark Zuckerberg',
      position: 'CEO Facebook',
      imageUrl: '/assets/images/mark-zuckerberg.jpg'
    },
    {
      name: 'Mark Zuckerberg',
      position: 'CEO Facebook',
      imageUrl: '/assets/images/mark-zuckerberg.jpg'
    },
    {
      name: 'Mark Zuckerberg',
      position: 'CEO Facebook',
      imageUrl: '/assets/images/mark-zuckerberg.jpg'
    },
    {
      name: 'Mark Zuckerberg',
      position: 'CEO Facebook',
      imageUrl: '/assets/images/mark-zuckerberg.jpg'
    },
    {
      name: 'Mark Zuckerberg',
      position: 'CEO Facebook',
      imageUrl: '/assets/images/mark-zuckerberg.jpg'
    },
    {
      name: 'Mark Zuckerberg',
      position: 'CEO Facebook',
      imageUrl: '/assets/images/mark-zuckerberg.jpg'
    }
  ]

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    
  }

  getBackgroundUrl(imageUrl){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${imageUrl})`);
  }

}
