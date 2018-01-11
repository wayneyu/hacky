import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule }     from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {AngularMaterialModule} from './angular-material.module';
import {MatTabsModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { FundListComponent }   from './fund/fund-list/fund-list.component';

import {CardComponent} from "./components/card/card.component";
import {MenuComponent} from "./components/menu/menu.component";

import {FundService} from "./fund/fund-service/fund-service";
import { MessageService } from './common/message.service'
import {fundReducer} from "./fund/fund-datastore/fund-datastore.reducer";

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
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
 //   StoreModule.forRoot({ reducer: reducer }),
 //   StoreModule.forRoot({FundStore: fundReducer})
    StoreDevtoolsModule.instrument()
  ],
  providers: [HttpClient, MessageService, FundService],
  bootstrap: [AppComponent]
})
export class AppModule { }

