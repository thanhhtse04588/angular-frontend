import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  validatingForm: FormGroup;

  ngOnInit() {
    this.validatingForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  get input() { return this.validatingForm.get('email'); }

}