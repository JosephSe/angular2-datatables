import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { DataTableModule } from "angular2-datatable";
import { Angular2DataTableModule } from 'angular2-data-table';
import { TableDataComponent } from './table-data/table-data.component';
import { DatePicker } from 'ng2-datepicker/ng2-datepicker';
import { CountSummaryChartComponent } from './count-summary-chart/count-summary-chart.component';

import { Angular2DatatablesRoutingModule } from './app-routing.module';
import { GoogleChartDirective } from './shared/google-chart.directive';
import { DashboardService } from './shared/dashboard.service';
import { SummaryComponent } from './summary/summary.component';
import { ErrorDetailsComponent } from './error-details/error-details.component';
import { CountSummaryTableComponent } from './count-summary-table/count-summary-table.component';
import { EntitySummaryTableComponent } from './entity-summary-table/entity-summary-table.component';
import { EntityDetailsComponent } from './entity-details/entity-details.component';
import { TopTileComponent } from './top-tile/top-tile.component';
import { TopTilesComponent } from './top-tiles/top-tiles.component';
import { JenkinsComponent } from './jenkins/jenkins.component';
import { AgtComponent } from './agt/agt.component';


@NgModule({
  declarations: [ 
    AppComponent,
    DashboardComponent,
    TopNavComponent,
    TableDataComponent,
    DatePicker,
    CountSummaryChartComponent,
    GoogleChartDirective,
    SummaryComponent,
    ErrorDetailsComponent,
    CountSummaryTableComponent,
    EntitySummaryTableComponent,
    EntityDetailsComponent,
    TopTileComponent,
    TopTilesComponent,
    JenkinsComponent,
    AgtComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2DataTableModule,
    DataTableModule,
    Angular2DatatablesRoutingModule
  ],
  providers: [DashboardService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
