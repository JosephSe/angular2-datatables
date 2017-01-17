import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../shared/dashboard.service';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'total-count-chart',
  templateUrl: './total-count-chart.component.html',
  styleUrls: ['./total-count-chart.component.css'],
  providers: [DatePipe]
})
export class TotalCountChartComponent implements OnInit {

  public lineChartData = [];
  public lineChartOptions;

  constructor(private _dashbaordService: DashboardService, private _datePipe: DatePipe) { }

  ngOnInit() {
    this._dashbaordService.getCountSummary().subscribe(data => this.loadChart(data));
  }

  loadChart(response) {
    var days = environment.summaryDaysCount;
    var chartData = [];
    for (var i = days; i >= 0; i--) {
      var total = 0;
      var date = new Date();
      date.setDate(date.getDate() - i);
      var dayStr = this._datePipe.transform(date, 'dd/MM/yyyy');
      var daysData = response.data[dayStr];
      if (daysData) {
        for (let ent of daysData) {
          total += ent.count;
        }
      }
      chartData.push([dayStr, total]);
    }
    this.lineChartData = this.generateChartData(chartData);
    this.lineChartOptions = {
      chart: {
        title: 'Error trend in past ' + days + ' days'
      },
      curveType: 'function'
    };
  }

  generateChartData(totalData) {
    var rows = [];
    rows.push(['Day', "Error Count"]);
    rows = rows.concat(totalData);
    return rows;
  }
}
