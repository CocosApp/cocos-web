import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { InformationComponent } from './information/information.component';
import { TeamComponent } from './team/team.component';
import { CocosAppComponent } from './cocos-app/cocos-app.component';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { MenuPopupComponent } from './menu-popup/menu-popup.component';

@NgModule({
  imports: [
    SharedModule,
    LandingRoutingModule
  ],
  declarations: [LandingComponent, HeaderComponent, FooterComponent, IntroComponent, 
    InformationComponent, TeamComponent, CocosAppComponent, AffiliateComponent, ContactUsComponent, 
    TestimonialComponent, MenuPopupComponent, ],
  entryComponents: [
    MenuPopupComponent
  ]
})
export class LandingModule { }
