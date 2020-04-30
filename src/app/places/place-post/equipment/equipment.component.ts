
import { SharedService } from './../../../shared/shared.service';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
})
export class EquipmentComponent implements OnInit {
  // table edit
  eqmTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;

  constructor(private fb: FormBuilder, public sharedService: SharedService) { }

  ngOnInit() {
    this.createTable();
    this.addRow();
  }
  // table equiment

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      likeNew: ['', [Validators.max(100), Validators.min(0)]],
      equipmentDescrible: ['', [Validators.maxLength(100)]],
      isEditable: [true]
    });
  }

  setToEdit(data) {
    this.clearTable();
    if (data?.length > 0) {
      data.forEach(element => {
        element.isEditable = false;
        this.addRow();
      });
      this.eqmTable.get('tableRows').patchValue(data);
    }
  }

  submitForm() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
  }
  createTable(): void {
    this.touchedRows = [];
    this.eqmTable = this.fb.group({
      tableRows: this.fb.array([])
    });
  }

  addRow() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }
  clearTable() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    control.clear();
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

  getEquipTable() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    // only Aprove row have been saved
    const savedRows = control.controls.filter(row => row.value.isEditable === false).map(row => row.value);
    return savedRows;
  }
}
