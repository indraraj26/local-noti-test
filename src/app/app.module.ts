import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot()],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
