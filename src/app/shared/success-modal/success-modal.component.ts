import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl:'./success-modal.component.html',
  styleUrl: './success-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SuccessModalComponent {
  router = inject(Router);

  constructor(public dialogRef: MatDialogRef<SuccessModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeModal(){
    this.dialogRef.close();
  }

  redirect(route: string){
    this.closeModal();
    this.router.navigate([route]);
  }
}
