import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../shared/dashboard.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'entity-summary-table',
  templateUrl: './entity-summary-table.component.html',
  styleUrls: ['./entity-summary-table.component.css'],
  providers: [DashboardService, DatePipe]
})
export class EntitySummaryTableComponent implements OnInit {

  selectedEntity = "PropertyContractRecord";

  public summary_ChartData = [];
  /*  public summary_ChartData = [
      ['id', 'childLabel', 'parent', 'size', { role: 'style' }],
      [0, 'Life', -1, 1, 'black'],
      [1, 'Archaea', 0, 1, 'black'],
      [2, 'Eukarya', 0, 5, 'black'],
      [3, 'Bacteria', 0, 1, 'black'],
  
      [4, 'Crenarchaeota', 1, 1, 'black'],
      [5, 'Euryarchaeota', 1, 1, 'black'],
      [6, 'Korarchaeota', 1, 1, 'black'],
      [7, 'Nanoarchaeota', 1, 1, 'black'],
      [8, 'Thaumarchaeota', 1, 1, 'black'],
  
      [9, 'Amoebae', 2, 1, 'black'],
      [10, 'Plants', 2, 1, 'black'],
      [11, 'Chromalveolata', 2, 1, 'black'],
      [12, 'Opisthokonta', 2, 5, 'black'],
      [13, 'Rhizaria', 2, 1, 'black'],
      [14, 'Excavata', 2, 1, 'black'],
  
      [15, 'Animalia', 12, 5, 'black'],
      [16, 'Fungi', 12, 2, 'black'],
  
      [17, 'Parazoa', 15, 2, 'black'],
      [18, 'Eumetazoa', 15, 5, 'black'],
  
      [19, 'Radiata', 18, 2, 'black'],
      [20, 'Bilateria', 18, 5, 'black'],
  
      [21, 'Orthonectida', 20, 2, 'black'],
      [22, 'Rhombozoa', 20, 2, 'black'],
      [23, 'Acoelomorpha', 20, 1, 'black'],
      [24, 'Deuterostomia', 20, 5, 'black'],
      [25, 'Chaetognatha', 20, 2, 'black'],
      [26, 'Protostomia', 20, 2, 'black'],
  
      [27, 'Chordata', 24, 5, 'black'],
      [28, 'Hemichordata', 24, 1, 'black'],
      [29, 'Echinodermata', 24, 1, 'black'],
      [30, 'Xenoturbellida', 24, 1, 'black'],
      [31, 'Vetulicolia', 24, 1, 'black']];
  
      */
  public summary_ChartOptions = {
    // maxFontSize: 14,
    colors: ['black', 'black', 'black'],
    wordtree: {
      format: 'explicit'
    }
  };


  constructor(private _dashboardService: DashboardService, private _datePipe: DatePipe) {
  }

  private loadTables(data) {
    var dataArray = [['id', 'childLabel', 'parent', 'count', { role: 'style' }]];
    var values = [];
    var pos = 0;
    for (var dat in data) {
      var dateIdx = pos;
      var entities = data[dat];
      values.push([dateIdx, dat, -1, 1, 'black']);
      pos++;
      for (var ent in entities) {
        var pIdx = pos;
        var recTypes = entities[ent];
        values.push([pIdx, ent, dateIdx, 1, 'black']);
        // values.push[pIdx, ent, pIdx - 1, recTypes.length, 'black'];
        pos++;
        for (var recType in recTypes) {
          var recTypeIdx = pos;
          var subEntities = recTypes[recType];
          values.push([recTypeIdx, recType, pIdx, 1, 'black']);
          // values.push([pos, recType, pIdx, subEntities.length, 'black']);
          pos++;
          for (var subEntity in subEntities) {
            var subEntityIdx = pos;
            values.push([subEntityIdx, subEntity, recTypeIdx, parseInt(subEntities[subEntity]), 'green']);
            pos++;
          }
        }
      }
    }

    dataArray = dataArray.concat(values);
    this.summary_ChartData = dataArray;
  }

  ngOnInit() {
    var dayStr = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
    // dayStr = '2016-10-27';
    this._dashboardService.getEntitySummaryData(this.selectedEntity, dayStr).subscribe(data => this.loadTables(data));
  }

  updateDate(date) {
    // var d = this.date;
    // var dayStr = this._datePipe.transform(new Date(d), 'yyyy-MM-dd');
    // this._dashboardService.getData(dayStr).subscribe(data => this.loadTables(data));
  }
}
