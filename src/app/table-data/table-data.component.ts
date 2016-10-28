import { Component, OnInit } from '@angular/core';
import { Angular2DataTableModule } from 'angular2-data-table';
import { TableOptions, TableColumn, ColumnMode } from 'angular2-data-table';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  rows = [];
  temp = [];

  val: string = '';

  options = new TableOptions({  
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 50,
    rowHeight: 'auto',
    limit: 10,
    columns: [
      new TableColumn({ name: 'Name' }),
      new TableColumn({ name: 'Gender' }),
      new TableColumn({ name: 'Company' })
    ]
  });

  updateFilter(val) {
    // remove existing
    this.rows.splice(0, this.rows.length);

    // filter our data
    let temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows.push(...temp);
  }

  constructor() {
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows.push(...data);
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

  ngOnInit() {
  }

}
