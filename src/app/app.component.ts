import { HeaderComponent } from './index/header/header.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit, AfterViewInit {
  headerComponent: HeaderComponent;
  constructor() {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {

  }

}
