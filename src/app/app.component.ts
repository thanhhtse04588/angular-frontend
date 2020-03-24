import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';

  ngOnInit(){
    $.getScript('../assets/template_library/js/custom.js');
    // do rest of your stuff here.
}

  
}
