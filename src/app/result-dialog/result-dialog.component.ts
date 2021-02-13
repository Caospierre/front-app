import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent implements OnInit {
  public result: string;

  constructor(    
    public dialogRef: MatDialogRef<ResultDialogComponent>
    ) { }

  ngOnInit(): void {
  }
  onNoClick():void {
    this.dialogRef.close();
  }

}
