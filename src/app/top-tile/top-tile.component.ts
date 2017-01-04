import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'top-tile',
  templateUrl: './top-tile.component.html',
  styleUrls: ['./top-tile.component.css']
})
export class TopTileComponent implements OnInit {

  @Input() title;
  @Input() icon;
  @Input() value;
  @Input() subContent;
  @Input() isUp;
  @Input() diff;
  @Input() hasDiff = false;
  @Input() diffSubText;

  constructor() { }

  ngOnInit() {
  }

}
