import { Component } from '@angular/core';
import { Routing } from './shared/animations/routing';
import { BaseComponent } from './shared/components/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [Routing.animation]
})
export class AppComponent extends BaseComponent {
  title = 'app';
}
