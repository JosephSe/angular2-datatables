import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

  atgSubPath = "/atg/queueData/"
  queueSubPath = this.atgSubPath + "count/"
  entitySummaryPath = this.atgSubPath + "2016-11-01/PropertyContractRecord/summary"

  getData(dayStr) {
    // var url = environment.serverURL + this.atgSubPath + dayStr + '/PropertyContractRecord';
    var url = environment.serverURL + this.atgSubPath + dayStr + "/";
    return this.call(url);
  }

  getEntitySummaryData(entity, dayStr) {
    // var url = environment.serverURL + this.atgSubPath + dayStr + "/" + entity + '/summary';
    var url = environment.serverURL + this.atgSubPath + dayStr + '/summary';
    return this.call(url);
  }

  getCountSummary() {
    var days = environment.summaryDaysCount;
    // "http://localhost:9000/atg/queueData/count/6?group=true"
    var url = environment.serverURL + this.queueSubPath + days + '?group=true';
    return this.call(url);
  }

  private call(url) {
    return this._http.get(url).map(res => res.json());
  }

  constructor(private _http: Http) { }

}
