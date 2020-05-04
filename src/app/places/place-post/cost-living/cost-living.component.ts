import { CostUnitName } from './../../../shared/model/place.model';
import { SharedService } from '../../../shared/service/shared.service';
import { PlaceService } from './../../service/place.service';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cost-living',
  templateUrl: './cost-living.component.html',
})
export class CostLivingComponent implements OnInit {
  eqmTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  units: CostUnitName[];
  defaultCost = [{ costName: 'Điện', unitID: 1, isEditable: true },
  { costName: 'Nước', unitID: 1, isEditable: true },
  { costName: 'Internet', unitID: 2, isEditable: true }
  ];

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.placeService.getCostUnit().subscribe(
      data => this.units = data as CostUnitName[]
    );
    this.creatTable();
    this.defaultCost.forEach(row => this.addRow());
    this.eqmTable.get('tableRows').patchValue(this.defaultCost);

    this.control = this.eqmTable.get('tableRows') as FormArray;
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

  initiateForm(): FormGroup {
    return this.fb.group({
      costName: ['', [Validators.required, Validators.maxLength(32)]],
      costPrice: ['', [Validators.required, Validators.min(0)]],
      unitID: ['', [Validators.required]],
      isEditable: [true]
    });
  }

  creatTable(): void {
    this.touchedRows = [];
    this.eqmTable = this.fb.group({
      tableRows: this.fb.array([])
    });
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
  clearTable() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    control.clear();
  }

  get getFormControls() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    return control;
  }

  getCostOfLivingTable() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    // only Aprove row have been saved
    const savedRows = control.controls.filter(row => row.value.isEditable === false).map(row => row.value);
    return savedRows;
  }

  getUnitName(id: number) {
    return this.units.find(unit => unit.id === id).unitName;
  }
}
