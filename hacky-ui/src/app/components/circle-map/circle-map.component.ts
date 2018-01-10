import { Component, OnInit } from '@angular/core';

import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-circle-map',
  templateUrl: './circle-map.component.html',
  styleUrls: ['./circle-map.component.css']
})
export class CircleMapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
    
      

  }

}
