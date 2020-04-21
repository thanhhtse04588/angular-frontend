import { HeaderComponent } from './index/header/header.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
