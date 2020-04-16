import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
    // table edit
    eqmTable: FormGroup;
    control: FormArray;
    mode: boolean;
    touchedRows: any;

  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    this.ngTableOnInit()
  }
  // table equiment

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required]],
      priceEq: ['', [Validators.required]],
      likeNew: [''],
      equipmentDescrible: ['', [Validators.maxLength(100)]],
      isEditable: [true]
    });
  }


  ngTableOnInit(): void {
    this.touchedRows = [];
    this.eqmTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }

  addRow() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control = this.eqmTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  get getFormControls() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    return control;
  }

  getEquipTable(){
    return this.eqmTable.get('tableRows').value
  }

  submitForm() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
  }
}
