import { Component } from "@angular/core";
import { Globals } from "../globals";
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  router = Router;
  user = '';
  private globals:Globals ;

  hide = true;

  constructor(private glob: Globals){
    this.globals = glob;
  }

  public login() {
    this.globals.login = true;
    console.log(this.user);
    this.globals.name = this.user;
  };
}
