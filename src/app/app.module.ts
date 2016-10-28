import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import {DataTableModule} from "angular2-datatable";
import { Angular2DataTableModule } from 'angular2-data-table';
import { TableDataComponent } from './table-data/table-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopNavComponent,
    TableDataComponent
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
