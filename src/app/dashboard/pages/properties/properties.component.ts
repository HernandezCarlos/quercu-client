import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Property } from '../../../models/property.interface';
import { PropertyService } from '../../../services/property.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { ErrorModalComponent } from '../../../shared/error-modal/error-modal.component';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SvgIconComponent
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export default class PropertiesComponent {

  properties: Property[] = [];
  propertyService = inject(PropertyService);
  router = inject(Router);

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllProperties();
  }

  getAllProperties(): void {
    this.propertyService.getAllProperties().subscribe(
      {
      next: data => {
        if (data.length > 0) {
          this.properties = data;
          this.cdr.detectChanges();
        } else {
          this.properties = [];
          this.cdr.detectChanges();
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

  updateProperty(property: Property) {
    this.router.navigateByUrl('dashboard/property-form', {state:  { property: property }});
  }

  deleteProperty(id: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: '¿Desea eliminar la propiedad?',
        message: 'Esta acción no puede deshacerse.',
      }
    });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.propertyService.deleteProperty(id).subscribe({
            next: data => {
               this.getAllProperties();
               this.cdr.detectChanges();
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
