import {MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatToolbarModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {NgModule} from "@angular/core";

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatToolbarModule, MatFormFieldModule, MatIconModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatGridListModule, MatToolbarModule, MatFormFieldModule, MatIconModule, MatInputModule],
})
export class AngularMaterialModule {
}
