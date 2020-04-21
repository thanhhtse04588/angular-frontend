import { PlaceService } from './../../service/place.service';
import { CostUnitName } from './../../../class/place-detail';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cost-living',
  templateUrl: './cost-living.component.html',
  styleUrls: ['./cost-living.component.css']
})
export class CostLivingComponent implements OnInit {
  eqmTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  units: CostUnitName[];
  defaultCost = [{ costName: "Điện",unitID:1, isEditable: true },
  { costName: "Nước" ,unitID:1, isEditable: true },
  { costName: "Internet" ,unitID:2, isEditable: true }
  ]

  constructor(private fb: FormBuilder,
    private placeService :PlaceService
  ) { }

  ngOnInit() {
    this.placeService.getCostUnit().subscribe(
      data=> this.units = data as CostUnitName[]
    )
    this.ngTableOnInit();
    this.control = this.eqmTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      costName: ['', Validators.required],
      costPrice: ['', [Validators.required]],
      unitID: ['', [Validators.required]],
      isEditable: [true]
    });
  }

  ngTableOnInit(): void {
    this.touchedRows = [];
    this.eqmTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.defaultCost.forEach(row => this.addRow())
    this.eqmTable.get('tableRows').patchValue(this.defaultCost);
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

  getCostOfLivingTable() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    const savedRows = control.controls.filter(row => row.value.isEditable == false).map(row => row.value); // only Aprove row have been saved
    return savedRows;
  }

  async setToEdit(data) {
    this.defaultCost.forEach((element, index, array) =>this.deleteRow(index))// Delete row default
    if (data?.length > 0) {
      await data.forEach(element => {
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

  getUnitName(id: number){
 return this.units.find(unit => unit.id === id ).unitName;
  }
}
