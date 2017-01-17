import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  @Input("header") header;
  constructor() { }

  ngOnInit() {
  }

}
