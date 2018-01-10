import { Component } from "@angular/core";
import { FundService } from '../fund-service/fund-service';

@Component({
  selector: 'fund-list',
  templateUrl: './fund-list.component.html'
})

export class FundListComponent {
  private fundList: any;

  constructor(private fundService: FundService) {}

    ngOnInit() {
      this.fundList = this.fundService.getFunds();

    }
}
