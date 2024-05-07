import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ChangeDetectorRef } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { PropertyType } from '../../../models/property-type.interface';
import { PropertyTypeService } from '../../../services/property-type.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { ErrorModalComponent } from '../../../shared/error-modal/error-modal.component';

@Component({
  selector: 'app-property-types',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SvgIconComponent
  ],
  templateUrl: './property-types.component.html',
  styleUrl: './property-types.component.scss',
})
export default class PropertyTypesComponent { 
  propertyTypes: PropertyType[] = []
  propertyTypeService = inject(PropertyTypeService);
  router = inject(Router);

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllPropertyTypes();
  }

  getAllPropertyTypes(): void {
    this.propertyTypeService.getAllPropertyTypes().subscribe(
      {
      next: data => {
        if (data.length > 0) {
          this.propertyTypes = data;
          this.cdr.detectChanges();
        }
      }, error: err => {
        console.log(err);
      }
    }
    )
  }

  updatePropertyType(propertyType: PropertyType) {
    this.router.navigateByUrl('dashboard/property-type-form', {state:  { propertyType: propertyType }});
  }

  deletePropertyType(id: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: '¿Desea eliminar el tipo de propiedad?',
        message: 'Esta acción no puede deshacerse. Al hacerlo se eliminaran las propiedades que sean de este tipo',
      }
    });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.propertyTypeService.deletePropertyType(id).subscribe({
            next: data => {
                this.getAllPropertyTypes();
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
