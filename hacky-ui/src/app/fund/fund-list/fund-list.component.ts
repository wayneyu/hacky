import { Component, OnInit, ViewChild } from '@angular/core';
import { FundService } from '../fund-service/fund-service';
import { Fund } from "../fund.model";
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { animate, state, style, transition, trigger } from '@angular/animations';

//let funds: Fund[];

@Component({
  selector: 'fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})



export class FundListComponent implements OnInit {

  fundList: Fund[];
  //dataSource: MatTableDataSource<Fund>;
  dataSource = new MatTableDataSource<Fund>();
  displayedColumns = ['name', 'category', 'performance', 'mgmtFee', 'mer', 'numInv', 'gross'];

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');
  expandedElement: any;

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
    this.dataSource.data = this.fundList;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */

// export class ExampleDataSource extends DataSource<any> {
//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//
//   connect(): Observable<Element[]> {
//     const rows = [];
//     funds.forEach(fund => rows.push(fund, { detailRow: true, fund }));
//    // console.log(rows);
//     return Observable.of(rows);
//   }


//}
