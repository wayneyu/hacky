// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Http } from '@angular/http';
// import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { Subscription } from 'rxjs/Subscription';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import { environment } from '../../../environments/environment';
// import { MessageService } from "../../common/message.service"
//
// import { Fund } from '../fund.model';
// import { FundListState } from '../fund-datastore/fund-datastore.reducer';
// import {
//   FundLoadSuccessAction
// //  ,FundGroupSelectedByIdAction
// } from '../fund-datastore/fund-datastore.action';
//
// @Injectable()
// export class FundService {
//   // private FUND_API_PATH = environment.api + '/funds';
//   private FUND_API_PATH = 'http://localhost:8090/funds';
//  // private FUND_API_PATH = 'http://35.182.179.107/funds';
//  // private FUND_API_PATH = 'http://35.182.179.107/funds/fundCity';
//
//   fundListState: Observable<FundListState<Fund>>;
//
//   constructor(private dataStore: Store<FundListState<Fund>>, private http: Http) {
//  //   this.fundListState = dataStore.select('FundStore');
//     this.getAllFunds();
//   }
//
//   // constructor(private http: HttpClient) {
//    //
//    // }
//
//   // constructor(
//   //   private http: HttpClient,
//   //             private messageService: MessageService) {
//   // }
//
//   /** Log a HeroService message with the MessageService */
//   // private log(message: string) {
//   //   this.messageService.add('FundService: ' + message);
//   // }
//
//
//  // getFunds(): Observable<Fund[]> {
//
//  //    getFunds() {
//  //    console.log('api');
//  //    console.log(this.http.get(this.FUND_API_PATH));
//  //    console.log('map');
//  //
//  //  //  results: Fund[];
//  //   // console.log(this.http.get(this.FUND_API_PATH).map(res => res.json()));
//  //
//  //  //   return this.http.get(this.FUND_API_PATH)
//  //  //     .map(res => res.json())
//  //  //     .subscribe(
//  //  //       data => console.log(data));
//  //
//  //    // this.http.get(this.FUND_API_PATH).subscribe(data => {
//  //    //   // Read the result field from the JSON response.
//  //    //   this.results = data['results'];
//  //    //   console.log(this.results);
//  //    // });
//  //
//  //
//  // //   return this.http.get(this.FUND_API_PATH);
//  //      //   .map(res => res.json());
//  //  //
//  //
//  //
//  //  }
//
//   // getAllFunds(): Observable<Fund[]> {
//   //   return this.http.get(this.FUND_API_PATH);
//   // }
//
//
//   getAllFunds() {
//     this.http.get(this.FUND_API_PATH)
//       .map(res => res.json() || [])
//       .subscribe((funds) => {
//         this.dataStore.dispatch(new FundLoadSuccessAction(funds));
//       });
//   }
//
//   subscribe(next?: (value: FundListState<Fund>) => void): Subscription {
//     return this.fundListState.subscribe(next);
//   }
// }

import {Injectable} from '@angular/core';
import {Fund} from "../fund.model";
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FundService {

  private FUND_API_PATH = 'http://localhost:8090/funds';
 // private FUND_API_PATH = 'http://35.182.179.107/funds';
 // private FUND_API_PATH = 'http://35.182.179.107/funds/fundCity';

  constructor(private http: HttpClient) {
  }

  getAllFunds(): Observable<any> {
    return this.http.get(this.FUND_API_PATH);
  }
}

