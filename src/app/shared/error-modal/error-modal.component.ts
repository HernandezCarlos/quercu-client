import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ErrorModalComponent {

  constructor(public dialogRef: MatDialogRef<ErrorModalComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  closeModal(){
    this.dialogRef.close();
  }
}
