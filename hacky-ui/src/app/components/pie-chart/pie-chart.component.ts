import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent {
  
  @Input() pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  @Input() pieChartData:number[] = [300, 500, 100];
  @Input() pieChartType:string = 'pie';
 
  @Input() options: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: false
    }
};
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}