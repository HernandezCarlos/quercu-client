import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './confimation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ConfirmationModalComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeModal(result: boolean){
    this.dialogRef.close(result);
  }
 }
