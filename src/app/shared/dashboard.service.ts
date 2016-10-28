import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

  atgSubPath = "/atg/queueData/"

  getData(dayStr) {
    var url = environment.serverURL + this.atgSubPath + dayStr +'/PropertyContractRecord';
    return this.call(url);
  }

  private call(url) {
    return this._http.get(url).map(res => res.json());
  }

  constructor(private _http:Http) { }

}
