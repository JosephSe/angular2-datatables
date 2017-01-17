import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DashboardService } from '../../../shared/dashboard.service';

@Component({
  selector: 'count-summary-table',
  templateUrl: './count-summary-table.component.html',
  styleUrls: ['./count-summary-table.component.css'],
  providers:[DashboardService]
})
export class CountSummaryTableComponent implements OnInit {

  @Input() countData;
  @Input() tableData= {};

  constructor(private _dashboardService:DashboardService) { }

  ngOnInit() {
    this._dashboardService.getCountSummary().subscribe(data => this.loadTable(data));
  }

  loadTable(data) {
    var entities = data.entities;
    var rows = []
    for (var dat in data.data) {
      rows.push(this.getRow(entities, dat, data.data[dat]));
    }
    this.tableData["data"] = rows;
    this.tableData["entities"] = entities
  }

  private getRow(entities, date, data) {
    var parts = date.split('/');
    var row = {};
    row['date'] = new Date(parts[2], parts[1] - 1, parts[0]);
    var dataValues = [];
    for (let dat of data) {
      row[dat.entity] = dat.count
    }
    for (let entity of entities) {
      var count = row[entity];
      if (count === undefined)
        row[entity] = 0;
    }
    return row;
  }

  getCss(value)  {
    var cls = "";
    var valInt = parseInt(value); 
    if(valInt > 100 && valInt < 500) cls = "label label-info"
    else if(valInt > 500 && valInt < 1000) cls = "label label-warning"
    else if(valInt > 1000) cls = "label label-danger";
    return cls;  
  }
}
