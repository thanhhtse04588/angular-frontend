import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface LoggerData {
  status: boolean;
  mess?: string;
}
@Component({
  selector: 'app-logger-dialog',
  templateUrl: './logger-dialog.component.html',
  styles: []
})
export class LoggerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoggerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoggerData) { }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
