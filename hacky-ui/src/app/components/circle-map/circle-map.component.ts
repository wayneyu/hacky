import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { FundCity } from '../../fund/fundCity.model';
import { FundCityService } from '../../fund/fund-city-service/fund-city-service';
import { forEach } from '@angular/router/src/utils/collection';
import { MatTableDataSource } from '@angular/material';

export class FundRow{
  fundname: string;
  netAmount: number;

  constructor(fundname: string,netAmount: number){
    this.fundname = fundname;
    this.netAmount = netAmount;
  }
}

export class FundCityGroup {
constructor(){
  this.datasource = new MatTableDataSource<FundRow>();

}
  datasource: MatTableDataSource<FundRow>
  country: string;
  state: string;
  city: string;
  lon : number;
  lat : number;
  total : number;
}

@Component({
  selector: 'app-circle-map',
  templateUrl: './circle-map.component.html',
  styleUrls: ['./circle-map.component.css',
              
]
})
export class CircleMapComponent implements OnInit {
  displayedColumns = ['fundname', 'netAmount'];
  fundCityList : FundCityGroup[];

  constructor(private fundCityService: FundCityService) {
    this.fundCityList = new Array<FundCityGroup>();
  }

  ngOnInit() {
    
    let byLoc : FundCity[] = this.fundCityService.getFunds();
    
    for(let i=0; i < byLoc.length; i++){
      let fcg : FundCityGroup = new FundCityGroup();

      fcg.lat = byLoc[i].lat;
      fcg.lon = byLoc[i].lon;
      fcg.city = byLoc[i].city;
      fcg.state = byLoc[i].state;
      fcg.country = byLoc[i].country;
      fcg.total = 0;
      

      for(let j=0;true; j++){
         if(i+j > byLoc.length-1){
          i += j;
          break;
        }else if(!(byLoc[i].lat == byLoc[i+j].lat && byLoc[i].lon == byLoc[i+j].lon) ){
          i += j;
          break;
        }


        fcg.datasource.data.push(new FundRow(byLoc[i+j].fundname, byLoc[i+j].netAmount));
        fcg.total += byLoc[i+j].netAmount;

        
      }
      
      this.fundCityList.push(fcg);
      
    }

  }

}


