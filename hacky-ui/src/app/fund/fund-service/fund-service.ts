import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { MessageService } from "../../common/message.service"
import {FUNDS} from "../mock-fund";

@Injectable()
export class FundService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add('FundService: ' + message);
  }

  getFunds() {
    return FUNDS;
  }
}
