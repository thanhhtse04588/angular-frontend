import { AuthService } from './auth.service';

import { Component } from '@angular/core';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  time;
 constructor(public auth: AuthService){

 }
}