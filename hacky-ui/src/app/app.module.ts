import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule }     from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';

import {AngularMaterialModule} from './angular-material.module';
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { FundListComponent }   from './fund/fund-list/fund-list.component';

import {CardComponent} from "./components/card/card.component";
import {MenuComponent} from "./components/menu/menu.component";

import {FundService} from "./fund/fund-service/fund-service";
import { MessageService } from './common/message.service'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FundListComponent,
    AppComponent,
    CardComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     HttpModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatTabsModule

  ],
  providers: [MessageService, FundService],
  bootstrap: [AppComponent]
})
export class AppModule { }

