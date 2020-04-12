import { AuthenticationService } from './../index/service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor( public loginService: AuthenticationService) { }

  ngOnInit() {
  }

}
