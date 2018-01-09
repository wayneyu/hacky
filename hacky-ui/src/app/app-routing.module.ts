import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { FundListComponent } from './fund-list/fund-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch:'full'},
  { path: 'dashboard', component:DashboardComponent },
  { path: 'fund-list', component:FundListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
