import { PlacePostComponent } from './../../places/place-post/place-post.component';

import { UserService } from './../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../index/service/authentication.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-seller-post-edit',
  templateUrl: './seller-post-edit.component.html',
})
export class SellerPostEditComponent implements OnInit, AfterViewInit {
  @ViewChild(PlacePostComponent)
  private placePostComponent: PlacePostComponent;

  placeID: number
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    public loginService: AuthenticationService, ) { }

  ngOnInit() {
    this.placeID = this.route.snapshot.params['id'];
  }
  ngAfterViewInit() {

    this.userService.getPostForm(this.placeID).subscribe(
      data => {
        data.placeID = this.placeID;
        this.placePostComponent.defaultToEdit(data);
      }
    )
  }
}
