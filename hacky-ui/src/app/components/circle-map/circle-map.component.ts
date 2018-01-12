import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { FundCity } from '../../fund/fundCity.model';
import { FundCityService } from '../../fund/fund-city-service/fund-city-service';
import { forEach } from '@angular/router/src/utils/collection';

export class FundCityGroup {
constructor(){
  this.fundname=new Array();
  this.netAmount=new Array();

}

  fundname: string[];
  netAmount: number[];
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
  fundCityList: FundCityGroup[];

  constructor(private fundCityService: FundCityService) {}

  ngOnInit() {
    this.fundCityList=new Array();
    
    let byLoc : FundCity[] = this.fundCityService.getFunds();
    
    for(let i=0; i < byLoc.length; i++){
      let fcg : FundCityGroup = new FundCityGroup();

      fcg.lat = byLoc[i].lat;
      fcg.lon = byLoc[i].lon;
      fcg.city = byLoc[i].city;
      fcg.state = byLoc[i].state;
      fcg.country = byLoc[i].country;
      
      fcg.fundname.push(byLoc[i].fundname);
      fcg.netAmount.push(byLoc[i].netAmount);
      fcg.total = byLoc[i].netAmount;

      for(let j=1;true; j++){
         if(i+j > byLoc.length-1){
          i += j;
          break;
        }else if(!(byLoc[i].lat == byLoc[i+j].lat && byLoc[i].lon == byLoc[i+j].lon) ){
          i += j;
          break;
        }


        fcg.fundname.push(byLoc[i+j].fundname);
        fcg.netAmount.push(byLoc[i+j].netAmount);
        fcg.total += byLoc[i+j].netAmount;

        
      }
      
      this.fundCityList.push(fcg);
    }
   
    
  }

}


