import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() dataReady = false;
  @Input() detectingLocation = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    
  }
}
