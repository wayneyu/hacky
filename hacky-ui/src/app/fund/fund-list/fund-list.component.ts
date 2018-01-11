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

  funds: Fund[];

  displayedColumns = ['name', 'price', 'topSubscriber', 'topPerformance', 'percentDealers', 'category'];
  dataSource;

  constructor(private fundService: FundService) {
  }


  ngOnInit() {
    this.fundService.getAllFunds().subscribe(
      data => {this.funds = data; this.dataSource = new MatTableDataSource<Fund>(data);},
      err => {
        console.log(err);
      });
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

//
// import { FundService } from '../fund-service/fund-service';
// import { Fund } from "../fund.model"
// import { FundListState } from '../fund-datastore/fund-datastore.reducer';
// import { FundLoadSuccessAction } from '../fund-datastore/fund-datastore.action';
//
// @Component({
//   selector: 'fund-list',
//   templateUrl: './fund-list.component.html'
// })
//
// export class FundListComponent {
//
//   //fundList: Observable<Fund[]>;
//   public fundList: Fund[] = [];
//
//   // displayedColumns = ['position', 'name', 'subscribe', 'symbol'];
//    dataSource: MatTableDataSource<>;
//   //
//   // constructor(private fundService: FundService) {}
//
//   constructor(private dataStore: Store<FundListState<Fund>>, private fundService: FundService) {
//       dataStore.subscribe(state => {
//         this.fundList = state['FundStore'].funds;
//       });
//   }
//
//   ngOnInit() {
//     this.fundService.getAllFunds().subscribe((funds: Fund[]) => {
//       this.dataStore.dispatch(new FundLoadSuccessAction(funds));
//     });
//
//     console.log(this.fundList);
//   }
//
//   //  ngOnInit() {
//  //  //  this.fundList = this.fundService.getFunds();
//  // //   this.fundService.getFunds().subscribe(data => {this.fundList = data});
//  //    this.fundService.getFunds();
//  //    //this.fundService.getFunds().subscribe(data => console.log(data));
//  //    console.log('Get from API: ');
//  // //   console.log(this.fundList);
//  //    //this.dataSource = new MatTableDataSource(this.fundList);
//
//
//
//
//   @ViewChild(MatSort) sort: MatSort;
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//
//   /**
//    * Set the sort after the view init since this component will
//    * be able to query its view for the initialized sort.
//    */
//   ngAfterViewInit() {
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//   }
// }

