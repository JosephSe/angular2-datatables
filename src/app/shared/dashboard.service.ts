import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

  atgSubPath = "/atg/queueData/"
  queueSubPath = "/atg/queueData/count/"

  getData(dayStr) {
    // var url = environment.serverURL + this.atgSubPath + dayStr +'/';
    var url = environment.serverURL + this.atgSubPath + dayStr +'/PropertyContractRecord';
    return this.call(url);
  }

  getCountSummary(days) {
    // "http://localhost:9000/atg/queueData/count/6?group=true"
    var url = environment.serverURL + this.queueSubPath + days +'?group=true';
    return this.call(url);
  }

  private call(url) {
    return this._http.get(url).map(res => res.json());
  }

  constructor(private _http:Http) { }

}
