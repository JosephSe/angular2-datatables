import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/dashboard.service';

@Component({
  selector: 'count-summary-chart',
  templateUrl: './count-summary-chart.component.html',
  styleUrls: ['./count-summary-chart.component.css'],
  providers: [DashboardService]
})
export class CountSummaryChartComponent implements OnInit {

  constructor(private _dashboardService: DashboardService) {

  }

  ngOnInit() {
    var noOfDays = 15;
    this._dashboardService.getCountSummary(noOfDays).subscribe(data => this.loadChart(data));

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
    console.log(JSON.stringify(rows));
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
