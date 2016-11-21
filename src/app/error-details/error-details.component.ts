import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/dashboard.service';
import { DatePipe } from '@angular/common';
// import * as _ from 'lodash';

@Component({
  selector: 'error-details-table',
  templateUrl: './error-details.component.html',
  styleUrls: ['./error-details.component.css'],
  providers: [DashboardService, DatePipe]
})
export class ErrorDetailsComponent implements OnInit {

  queueData = [];
  private filteredData;
  date;
  temp = [];
  val: string = '';
  dataLoading = true;


  constructor(private _dashboardService: DashboardService, private _datePipe: DatePipe) {
  }

  private loadTables(data) {
    this.queueData = data;
    this.dataLoading = false;
  }

  ngOnInit() {
    var dayStr = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
    // dayStr = '2016-11-02';
    this._dashboardService.getData(dayStr).subscribe(data => this.loadTables(data));
  }

  updateDate(date) {
    this.dataLoading = true;
    var d = this.date;
    this.queueData = [];
    var dayStr = this._datePipe.transform(new Date(d), 'yyyy-MM-dd');
    // dayStr = '2016-10-27';
    this._dashboardService.getData(dayStr).subscribe(data => this.loadTables(data));
  }
}
