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

  public data = {};
  public options = {};
  public responsiveOptions = {};

  constructor(private _dashbaordService: DashboardService, private _datePipe: DatePipe) { }

  ngOnInit() {
    this._dashbaordService.getCountSummary().subscribe(data => this.loadChart(data));
  }

  loadChartNew(response) {
    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
        [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
      ]
    };
    this.options = {
      seriesBarDistance: 10
    };
    this.responsiveOptions = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

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
