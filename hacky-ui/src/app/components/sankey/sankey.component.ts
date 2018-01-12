import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sankey',
  templateUrl: './sankey.component.html',
  styleUrls: ['./sankey.component.css']
})
export class SankeyComponent implements OnInit {

  public options: any ;

  constructor() { }

  ngOnInit() {
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
          display: false
      },
    };
  }

}
