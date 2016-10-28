import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/dashboard.service';
import { DatePipe } from '@angular/common';
// import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService, DatePipe]
})
export class DashboardComponent implements OnInit {

  queueData = [];
  private filteredData;

  temp = [];
  val: string = '';


  constructor(private _dashboardService: DashboardService, private _datePipe: DatePipe) {
    this.fetch((data) => {
      // cache our list
      this.queueData = [...data];
      this.temp = [...data];

      // push our inital complete list
      this.queueData.push(...data);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `https://unpkg.com/angular2-data-table@0.2.0/assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  private loadTables(data) {
    this.queueData = data.PropertyContract;
  }

  ngOnInit() {
    var dayStr = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this._dashboardService.getData(dayStr).subscribe(data => this.loadTables(data));
  }

  public updateData(query: string) {
    console.log(query);
    // remove existing
    this.queueData.splice(0, this.queueData.length);

    // filter our data
    let temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(query) !== -1 || !query;
    });

    // update the rows
    // this.queueData = this.temp;
    this.queueData.length = 0;
      this.queueData.push(...this.temp);

    // if (query) {
    //   this.filteredData = _.filter(this.queueData, (a) => a.name.indexOf(query) >= 0);
    // } else {
    //   this.filteredData = this.queueData;
    // }
  }
}
