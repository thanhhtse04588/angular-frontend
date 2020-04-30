import { PlaceQuickView } from 'src/app/shared/model/place.model';
import { SharedService } from './../../shared/shared.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-place-quick-view',
  templateUrl: './place-quick-view.component.html',
  styles: []
})
export class PlaceQuickViewComponent implements OnInit {
@Input() place: PlaceQuickView;
  constructor( public sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
