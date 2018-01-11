import {MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatToolbarModule} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatToolbarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatToolbarModule],
})
export class AngularMaterialModule {
}
