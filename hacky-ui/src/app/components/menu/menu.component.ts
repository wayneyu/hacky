import {Component, Input} from "@angular/core";
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'menu',
  templateUrl: 'menu.component.html'
})
export class MenuComponent {

  menus: any[];
  @Input() url: String;
  @Input() title: String;
  @Input() description: String;

  constructor() {
    this.menus = [
      // {id: 1, label: 'Home', path: '/dashboard'},
      {id: 1, label: 'Fund List', path: '/fund-list'},
      {id: 2, label: 'Fund Map', path: '/fund-map'},
      {id: 3, label: 'Fund Transfer Graph', path: '/sankey'}
    ];
  }

  tabChanged(event: MatTabChangeEvent){
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
 //   this.router.navigate(['/administration']);
  }
}
