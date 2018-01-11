import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { FundCity } from '../../fund/fundCity.model';
import { FundCityService } from '../../fund/fund-city-service/fund-city-service';

@Component({
  selector: 'app-circle-map',
  templateUrl: './circle-map.component.html',
  styleUrls: ['./circle-map.component.css',
              
]
})
export class CircleMapComponent implements OnInit {
  fundCityList: FundCity[];

  constructor(private fundCityService: FundCityService) {}

  ngOnInit() {
    this.fundCityList = this.fundCityService.getFunds();
   


  }

}
