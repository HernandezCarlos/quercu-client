import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Property } from '../../../models/property.interface';
import { PropertyService } from '../../../services/property.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../../shared/success-modal/success-modal.component';
import { ErrorModalComponent } from '../../../shared/error-modal/error-modal.component';
import { RouterModule } from '@angular/router';
import { OwnerService } from '../../../services/owner.service';
import { PropertyTypeService } from '../../../services/property-type.service';
import { PropertyType } from '../../../models/property-type.interface';
import { Owner } from '../../../models/owner.interface';
import { SvgIconComponent } from 'angular-svg-icon';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SvgIconComponent,
    ConfirmationModalComponent,
    ErrorModalComponent,
    SuccessModalComponent
  ],
  templateUrl: './property-form.component.html',
  styleUrl: './property-form.component.scss',
})
export default class PropertyFormComponent { 
  propertyForm: FormGroup;
  property: Property;
  owners: Owner[] = [];
  propertyTypes: PropertyType[] = [];
  loading: boolean = false;
  private ownerService = inject(OwnerService);
  private propertyTypeService = inject(PropertyTypeService);
  private propertyService = inject(PropertyService);

  constructor(private fb: FormBuilder, public dialog: MatDialog, private location: Location, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initForm();
    this.loadOwners();
    this.loadPropertyTypes();
    const state = this.location.getState();
    this.property = state['property'];
    if (this.property) {
      this.fillForm();
    }
  }

  initForm() {
    this.propertyForm = this.fb.group({
      number: ['', Validators.required],
      address: ['', Validators.required],
      area: [null, Validators.required],
      constructionArea: [null],
      ownerId: [null, Validators.required],
      propertyTypeId: [null, Validators.required]
    });
  }

  fillForm() {
    this.propertyForm.patchValue({
      number: this.property.number,
      address: this.property.address,
      area: this.property.area,
      constructionArea: this.property.constructionArea,
      ownerId: this.property.ownerId,
      propertyTypeId: this.property.propertyTypeId
    });
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      const formData = {
        ...this.propertyForm.value,
        ownerId: parseInt(this.propertyForm.get('ownerId')?.value),
        propertyTypeId: parseInt(this.propertyForm.get('propertyTypeId')?.value)
      };
      this.propertyService.createProperty(formData).subscribe({
        next: (data) => {
          if (data) {
            this.dialog.open(SuccessModalComponent, {
              data: {
                message: 'La propiedad ha sido creada',
                route: '/dashboard/properties'
              }
            });
          }
        },
        error: () => {
          this.dialog.open(ErrorModalComponent, {
            data: 'Hubo un error. Por favor intente más tarde'
          });
        }
      });
    } else {
      alert('Por favor, rellene todos los campos obligatorios.');
    }
  }

  updateProperty(property: Property) {
    if (this.propertyForm.valid) {
      const formData = {
        id: this.property?.id,
        number: this.propertyForm.get('number')?.value,
        address: this.propertyForm.get('address')?.value,
        area: this.propertyForm.get('area')?.value,
        constructionArea: this.propertyForm.get('constructionArea')?.value,
        ownerId: parseInt(this.propertyForm.get('ownerId')?.value),
        propertyTypeId: parseInt(this.propertyForm.get('propertyTypeId')?.value)
      };
      this.loading = true;
      this.cdr.detectChanges();

      this.propertyService.updateProperty(property.id, formData).subscribe({
        next: data => {
          this.loading = false;
          this.cdr.detectChanges();
          if(data){
            this.dialog.open(SuccessModalComponent,{
              data: {
                  message: 'La propiedad se ha actualizado',
                  route: '/dashboard/properties'
                }
            })
          }
        }, error: err => {
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  loadOwners() {
    this.ownerService.getAllOwners().subscribe({
      next: (owners) => {
        this.owners = owners;
        this.cdr.detectChanges();
      },
      error: () => alert('Error al cargar los propietarios')
    });
  }

  loadPropertyTypes() {
    this.propertyTypeService.getAllPropertyTypes().subscribe({
      next: (propertyTypes) => {
        this.propertyTypes = propertyTypes;
        this.cdr.detectChanges();
      },
      error: () => alert('Error al cargar los tipos de propiedad')
    });
  }
}
