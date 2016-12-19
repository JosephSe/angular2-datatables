import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/dashboard.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'count-summary-chart',
  templateUrl: './count-summary-chart.component.html',
  styleUrls: ['./count-summary-chart.component.css'],
  providers: [DashboardService]
})
export class CountSummaryChartComponent implements OnInit {

  countData;

  constructor(private _dashboardService: DashboardService) {

  }

  ngOnInit() {
    this._dashboardService.getCountSummary().subscribe(data => this.loadChart(data));
    // this.loadChart(this.countData);
  }

  loadChart(data) {
    var entities = data.entities;
    var header = ['Day'];
    header = header.concat(entities);
    var rows = []
    rows.push(header);
    for(var dat in data.data){
      rows.push(this.getRow(entities, dat, data.data[dat]));
    }
    this.line_ChartData = rows;
  }

  private getRow(entities, date, data) {
    var parts =date.split('/');
    var row = [new Date(parts[2],parts[1]-1, parts[0])];
    var dataValues = [];
    for (let dat of data) {
      dataValues[dat.entity] = dat.count
    }
    for (let entity of entities) {
      var count = dataValues[entity];
      if (count === undefined)
        count = 0;
      row.push(count);
    }
    return row;
  }
  
  public line_ChartData = [];
  public line_ChartOptions = {
    animation:{
        duration: 1000,
        easing: 'out',
      }
  };

  public combo_ChartOptions = {
    isStacked: true
  };
}
