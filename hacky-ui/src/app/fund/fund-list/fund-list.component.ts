import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { FundService } from '../fund-service/fund-service';
import { Fund } from "../fund.model"

@Component({
  selector: 'fund-list',
  templateUrl: './fund-list.component.html'
})

export class FundListComponent {

  //fundList: Observable<Fund[]>;
  fundList: Fund[];

  displayedColumns = ['position', 'name', 'subscribe', 'symbol'];
  dataSource: MatTableDataSource<Fund>;

  constructor(private fundService: FundService) {}

  ngOnInit() {
  //  this.fundList = this.fundService.getFunds();
 //   this.fundService.getFunds().subscribe(data => {this.fundList = data});
    this.fundService.getFunds();
    //this.fundService.getFunds().subscribe(data => console.log(data));
    console.log('Get from API: ');
 //   console.log(this.fundList);
    //this.dataSource = new MatTableDataSource(this.fundList);


  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
