import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import 'zone.js/dist/zone-patch-rxjs';
import { GlobalErrorHandler } from './shared/services/chun_error_handling';
import { HackohireComponent } from './read-more/hackohire/hackohire.component';
import { WellnessComponent } from './read-more/wellness/wellness.component';
import { SocialImpactComponent } from './read-more/social-impact/social-impact.component';
import { TeamIqComponent } from './read-more/team-iq/team-iq.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HackohireComponent,
    WellnessComponent,
    SocialImpactComponent,
    TeamIqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
