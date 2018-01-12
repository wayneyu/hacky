import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule }     from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularMaterialModule} from './angular-material.module';
import {MatTabsModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { FundListComponent }   from './fund/fund-list/fund-list.component';

import {CardComponent} from "./components/card/card.component";
import {CircleMapComponent} from "./components/circle-map/circle-map.component";
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {MenuComponent} from "./components/menu/menu.component";
import {SankeyComponent} from "./components/sankey/sankey.component";

import {FundService} from "./fund/fund-service/fund-service";
import { MessageService } from './common/message.service'
import { FundCityService } from './fund/fund-city-service/fund-city-service';
import { CdkDetailRowDirective } from './common/cdk-detail-row.directive'
import { ScalePipe } from './components/circle-map/scale.pipe';
import { ChartsModule } from 'ng2-charts';
import { CircleColorPipe } from './components/circle-map/circleColor.pipe';
import { PieChartComponent } from 'app/components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CircleMapComponent,
    DashboardComponent,
    FundListComponent,
    AppComponent,
    CardComponent,
    MenuComponent,
    CdkDetailRowDirective,
    MenuComponent,
    SankeyComponent,
    PieChartComponent,
    ScalePipe,
    CircleColorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAT7o3F1_8wWPVlA_O0nxpHgyTtPKHw6c'
    }),
    AgmSnazzyInfoWindowModule,
    AngularMaterialModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatPaginatorModule,
    ChartsModule
  ],
  providers: [MessageService, FundService, FundCityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

