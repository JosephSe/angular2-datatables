import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { DataTableModule } from "angular2-datatable";
import { Angular2DataTableModule } from 'angular2-data-table';
import { TableDataComponent } from './table-data/table-data.component';
import { DatePicker } from 'ng2-datepicker/ng2-datepicker';
import { CountSummaryChartComponent } from './count-summary-chart/count-summary-chart.component';

import { GoogleChartDirective } from './shared/google-chart.directive';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopNavComponent,
    TableDataComponent,
    DatePicker,
    CountSummaryChartComponent,
    GoogleChartDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2DataTableModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
