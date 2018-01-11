import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule }     from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { MatTabsModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MessageService } from './common/message.service'
import { CardComponent} from "./components/card/card.component";
import { MenuComponent} from "./components/menu/menu.component";

import { FundService } from "./fund/fund-service/fund-service";
import { FundListComponent }   from './fund/fund-list/fund-list.component';


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
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
  ],
  providers: [HttpClient, MessageService, FundService],
  bootstrap: [AppComponent]
})
export class AppModule { }

