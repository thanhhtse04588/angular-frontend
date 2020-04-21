import { AuthService } from './auth.service';

import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
 constructor(public auth: AuthService){

 }
}