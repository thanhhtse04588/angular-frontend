
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';

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
  defaultCost=[{costName: "Điện",costPrice:"",isEditable: false},
  {costName: "Nước",costPrice:"",isEditable: false}
  ]

  constructor(private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.ngTableOnInit();
    this.control = this.eqmTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      costName: ['', Validators.required],
      costPrice: ['', [Validators.required]],
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

  getCostOfLivingTable(){
    return this.eqmTable.get('tableRows').value
  }

  submitForm() {
    const control = this.eqmTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
  }
}
