import { Component, OnInit } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashboardService } from '../shared/dashboard.service';
@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [DashboardService]
})
export class SummaryComponent {

  countData;

  constructor(private _dashboardService: DashboardService) {
    var test = "";
  }


  setData(data) {
    this.countData = data;
  }

}
