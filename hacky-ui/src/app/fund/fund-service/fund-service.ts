import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { MessageService } from "../../common/message.service"

import { Fund } from '../fund.model';

@Injectable()
export class FundService {
  // private FUND_API_PATH = environment.api + '/funds';
 // private FUND_API_PATH = 'http://localhost:8090/funds';
  private FUND_API_PATH = 'http://35.182.179.107/funds';
 // private FUND_API_PATH = 'http://35.182.179.107/funds/fundCity';

  results: any;
   constructor(private http: HttpClient) {

   }

  // constructor(
  //   private http: HttpClient,
  //             private messageService: MessageService) {
  // }

  /** Log a HeroService message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add('FundService: ' + message);
  // }


 // getFunds(): Observable<Fund[]> {

    getFunds() {
    console.log('api');
    console.log(this.http.get(this.FUND_API_PATH));
    console.log('map');

  //  results: Fund[];
   // console.log(this.http.get(this.FUND_API_PATH).map(res => res.json()));

  //   return this.http.get(this.FUND_API_PATH)
  //     .map(res => res.json())
  //     .subscribe(
  //       data => console.log(data));

    this.http.get(this.FUND_API_PATH).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
      console.log(this.results);
    });
    //console.log(this.results);

 //   return this.http.get(this.FUND_API_PATH);
      //   .map(res => res.json());
  //
  }



  // getAllFunds() {
  //   this.http.get(this.FUND_API_PATH)
  //     .subcribe(
  //       (funds) => {
  //         this.populateFundList(funds);
  //       }
  //     )
  //    .map(res => res.json() || [])
  // }

//  populateFundList (funds: Array<Fund>) {
//    this.listS
//  }
}
