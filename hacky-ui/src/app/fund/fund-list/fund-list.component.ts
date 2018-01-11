import { Component, OnInit, ViewChild } from '@angular/core';
import { FundService } from '../fund-service/fund-service';
import {Fund} from "../fund.model";
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css'],
})

export class FundListComponent implements OnInit {

  fundList: Fund[];
  dataSource: MatTableDataSource<Fund>;

  displayedColumns = ['name', 'price', 'topSubscriber', 'topPerformance', 'percentDealers', 'category'];

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
