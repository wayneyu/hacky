import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {AngularMaterialModule} from './angular-material.module';

import {CardComponent} from "./components/card/card.component";
import {CircleMapComponent} from "./components/circle-map/circle-map.component";
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CircleMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAT7o3F1_8wWPVlA_O0nxpHgyTtPKHw6c'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
