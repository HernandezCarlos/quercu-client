import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OwnerService } from '../../../services/owner.service';
import { Owner } from '../../../models/owner.interface';
import { SvgIconComponent } from 'angular-svg-icon';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { ErrorModalComponent } from '../../../shared/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';;

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SvgIconComponent,
    ConfirmationModalComponent
  ],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class OwnersComponent implements OnInit {

  owners: Owner[] =[];
  ownerService = inject(OwnerService);
  router = inject(Router);

  constructor(public dialog: MatDialog,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllOwners();
  }

  getAllOwners(): void {
    this.ownerService.getAllOwners().subscribe(
      {
      next: data => {
        if (data.length > 0) {
          this.owners = data;
          this.cdr.detectChanges();
        } else {
          this.owners = [];
        }
      }, error: err => {
        this.dialog.open(ErrorModalComponent, {
          data: 'Hubo un error. Por favor intente mas tarde'
        });
        console.log(err);
      }
    }
    )
  }

  updateOwner(owner: Owner) {
    this.router.navigateByUrl('dashboard/owner-form', {state:  { owner: owner }});
  }

  deleteOwner(owner: Owner) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: '¿Desea eliminar el dueño?',
        message: 'Esta acción no puede deshacerse. Al hacerlo se eliminaran las propiedades que el dueño posee',
      }
    });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.ownerService.deleteOwner(owner.id).subscribe({
            next: data => {
              if (data) {
                this.getAllOwners();
                this.cdr.detectChanges();
              }
            }, error: err => {
              this.dialog.open(ErrorModalComponent, {
                data: 'Hubo un error. Por favor intente mas tarde'
              });
            }
          });
        } else {
          return;
        }
      });
  }
}
