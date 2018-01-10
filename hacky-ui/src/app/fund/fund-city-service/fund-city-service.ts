import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { MessageService } from "../../common/message.service"

import { FundCity } from '../fundCity.model';
import { FUNDCITYS } from '../mock-fundCity';

@Injectable()
export class FundCityService {
  private FUND_API_PATH = environment.api + 'hacky/api/funds/fundCity';

  /*
   constructor(private http: Http) {

   }
 */
  constructor(
    //private http: HttpClient,
              private messageService: MessageService) {
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('FundCityService: ' + message);
  }

  getFunds() {
    return FUNDCITYS;
  }
  // getFunds(): Observable<Fund[]> {
  //   return of(FUNDS);
  // }
  // getAllFunds() {
    // this.http.get(this.FUND_API_PATH)
      // .subcribe(
      //   (funds) => {
      //     this.populateFundList(funds);
      //   }
      // )
     // .map(res => res.json() || [])
  //}

//  populateFundList (funds: Array<Fund>) {
//    this.listS
//  }
}
