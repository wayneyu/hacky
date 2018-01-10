import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { FundService } from '../fund-service/fund-service';
import { Fund } from "../fund.model"

@Component({
  selector: 'fund-list',
  templateUrl: './fund-list.component.html'
})

export class FundListComponent {

  fundList: Fund[];
  displayedColumns = ['position', 'name', 'subscribe', 'symbol'];
  dataSource: MatTableDataSource<Fund>;

  constructor(private fundService: FundService) {}

  ngOnInit() {
    this.fundList = this.fundService.getFunds();
    this.dataSource = new MatTableDataSource(this.fundList);


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
