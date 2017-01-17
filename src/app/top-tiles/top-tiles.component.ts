import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/dashboard.service';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'top-tiles',
  templateUrl: './top-tiles.component.html',
  styleUrls: ['./top-tiles.component.css'],
  providers: [DatePipe]
})
export class TopTilesComponent implements OnInit {

  public totalToday = 0;
  public totalYday = 0;
  private daysCount = 7;

  // public totalTitle = "Total errors today";
  // public totalSubContent = "since yesterday";

  public total: any = {};
  public worstEntity: any = {};
  public todaysEntities: any = {};

  constructor(private _dashboardService: DashboardService, private _datePipe: DatePipe) {
  }

  ngOnInit() {
    this._dashboardService.getCountSummary().subscribe(data => this.loadTileInfo(data));
  }

  loadTileInfo(response) {
    this.updateTotal(response);
    this.getWorstEntites(response);
    this.getTotalEntitiesToday(response);
    this.getTotalErrors(response);
  }

  updateTotal(response) {
    var today = new Date();
    var yday = new Date();
    yday.setDate(today.getDate() - 1);
    var todayStr = this._datePipe.transform(today, 'dd/MM/yyyy');
    var ydayStr = this._datePipe.transform(yday, 'dd/MM/yyyy');
    var todaysData = response.data[todayStr];
    var todaysTotal = 0;
    if (todaysData) {
      for (let entity of todaysData) {
        todaysTotal += entity.count;
      }
    }
    var ydaysData = response.data[ydayStr];
    var ydaysTotal = 0;
    for (let entity of ydaysData) {
      ydaysTotal += entity.count;
    }
    var diff = todaysTotal - ydaysTotal;
    this.total.isUp = diff > 0;
    // diff = (diff / ydaysTotal) * 100;

    var icon = "";
    if (this.total.isUp) icon = 'fa-thumbs-o-down red';
    else icon = 'fa-thumbs-o-up green';

    this.total.title = "Errors today";
    this.total.icon = icon;
    this.total.iconColor = "";
    this.total.subContent = "since yday";
    this.total.today = todaysTotal;
    this.total.hasDiff = true;
    this.total.yday = ydaysTotal;
    this.total.diff = diff;
    this.total.diffSubText = "";
  }

  getWorstEntites(response) {
    var today = new Date();
    var entities = {};
    var i;
    for (entity in response.entities) {
      entities[response.entities[entity]] = 0;
    }

    for (i = 0; i < this.daysCount; i++) {
      var date = new Date();
      date.setDate(date.getDate() - i);
      var dayStr = this._datePipe.transform(date, 'dd/MM/yyyy');
      var daysData = response.data[dayStr];
      if (daysData) {
        for (let ent of daysData) {
          var sum = entities[ent.entity];
          sum += ent.count;
          entities[ent.entity] = sum;
        }
      }
    }

    var maxEntity = "";
    var maxSum = 0;
    for (var entity in entities) {
      var sum = entities[entity];
      if (sum > maxSum) {
        maxSum = sum;
        maxEntity = entity;
      }
    }

    var days = this.daysCount;
    this.worstEntity.isUp = true;
    this.worstEntity.icon = "fa-exclamation-triangle yellow";
    this.worstEntity.title = "Worst entity";
    this.worstEntity.subContent = maxEntity + " failures past " + days + " days";
    this.worstEntity.sum = maxSum;
    // this.worstEntity.title = maxEntity;
    // this.worstEntity.subContent = maxSum + " failures past 7 days";
    // this.worstEntity.sum = "Worst entity";
    this.worstEntity.hasDiff = false;
    this.worstEntity.diff = "";
    this.worstEntity.diffSubText = "";
  }

  getTotalEntitiesToday(response) {
    var date = new Date();
    var dayStr = this._datePipe.transform(date, 'dd/MM/yyyy');
    var todaysData = response.data[dayStr];
    var tCount = getCount(todaysData)

    date.setDate(date.getDate() - 1);
    dayStr = this._datePipe.transform(date, 'dd/MM/yyyy');
    var ydayData = response.data[dayStr];
    var yCount = getCount(ydayData);

    function getCount(entity) {
      if (entity === undefined) return 0
      else return entity.length;
    }

    var diff = tCount - yCount;
    var isUp = diff > 0;
    var icon = "";
    if (isUp) icon = 'fa-thumbs-o-down red';
    else icon = 'fa-thumbs-o-up green';

    this.todaysEntities.isUp = isUp;
    this.todaysEntities.icon = icon;
    this.todaysEntities.title = "Entities Today";
    this.todaysEntities.subContent = "since yday";
    this.todaysEntities.sum = tCount;
    this.todaysEntities.hasDiff = true;
    this.todaysEntities.diff = tCount - yCount;
    this.todaysEntities.diffSubText = "";

  }

  getTotalErrors(response) {
    var today = new Date();
    var total = 0;

    for (var day in response.data) {
      total = 0;
      // for(var ent in day) {
      // total = total + ent.count;
      // }
    }

  }
}
