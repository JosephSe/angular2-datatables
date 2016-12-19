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
  // public totalTitle = "Total errors today";
  // public totalSubContent = "since yesterday";

  public total: any = {};
  public worstEntity: any = {};

  constructor(private _dashboardService: DashboardService, private _datePipe: DatePipe) {
  }

  ngOnInit() {
    this._dashboardService.getCountSummary().subscribe(data => this.loadTileInfo(data));
  }

  loadTileInfo(response) {
    this.updateTotal(response);
    this.getWorstEntity(response);
  }

  updateTotal(response) {
    var today = new Date();
    var yday = new Date();
    yday.setDate(today.getDate() - 1);
    var todayStr = this._datePipe.transform(today, 'dd/MM/yyyy');
    var ydayStr = this._datePipe.transform(yday, 'dd/MM/yyyy');
    var todaysData = response.data[todayStr];
    var todaysTotal = 0;
    for (let entity of todaysData) {
      todaysTotal += entity.count;
    }
    var ydaysData = response.data[ydayStr];
    var ydaysTotal = 0;
    for (let entity of ydaysData) {
      ydaysTotal += entity.count;
    }
    var diff = todaysTotal - ydaysTotal;
    this.total.isUp = diff > 0;
    diff = (diff / ydaysTotal) * 100;

    this.total.title = "Total errors today";
    this.total.subContent = "since yday";
    this.total.today = todaysTotal;
    this.total.hasDiff = true;
    this.total.yday = ydaysTotal;
    this.total.diff = diff;
    this.total.diffSubText = "%";
  }

  getWorstEntity(response) {
    var today = new Date();
    var entities = {};
    var i;
    for (entity in response.entities) {
      entities[response.entities[entity]] = 0;
    }

    for (i = 0; i < 6; i++) {
      var date = new Date();
      date.setDate(date.getDate() - i);
      var dayStr = this._datePipe.transform(date, 'dd/MM/yyyy');
      var daysData = response.data[dayStr];
      for(let ent of daysData) {
        var sum = entities[ent.entity];
        sum += ent.count;
        entities[ent.entity] = sum;
      }
    }

    var maxEntity = "";
    var maxSum = 0;
    for(var entity in entities) {
      var sum = entities[entity];
      if(sum > maxSum) {
        maxSum = sum;
        maxEntity = entity;
      }
    }
    this.worstEntity.title = "Worst entity";
    this.worstEntity.subContent = maxEntity;
    this.worstEntity.sum = maxSum;
    this.worstEntity.hasDiff = false;
    this.worstEntity.diff = "";
    this.worstEntity.diffSubText = "";
  }
}
