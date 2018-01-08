import {Component, Input} from "@angular/core";

@Component({
  selector: 'item-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})
export class CardComponent {

  @Input() url: String;
  @Input() title: String;
  @Input() description: String;

  constructor() {
  }
}
