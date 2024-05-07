import { CommonModule, Location} from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyType } from '../../../models/property-type.interface';
import { MatDialog } from '@angular/material/dialog';
import { PropertyTypeService } from '../../../services/property-type.service';
import { SuccessModalComponent } from '../../../shared/success-modal/success-modal.component';
import { ErrorModalComponent } from '../../../shared/error-modal/error-modal.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-type-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SvgIconComponent,
    ErrorModalComponent,
    SuccessModalComponent
  ],
  templateUrl: './property-type-form.component.html',
  styleUrl: './property-type-form.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class PropertyTypeFormComponent implements OnInit { 
  
  propertyTypeForm: FormGroup;
  propertyType: PropertyType;
  loading: boolean = false;
  private propertyTypeService = inject(PropertyTypeService);

  constructor(private fb: FormBuilder, public dialog: MatDialog,  private location: Location, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
   this.initForm();
   const state = this.location.getState();
   this.propertyType = state['propertyType'];
   if (this.propertyType) {
      this.fillForm();
    }
  }

  initForm() {
    this.propertyTypeForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  fillForm() {
    this.propertyTypeForm.patchValue({
      description: this.propertyType.description,
   });
  }

  onSubmit() {
    if (this.propertyTypeForm.valid) {
      this.propertyTypeService.createPropertyType(this.propertyTypeForm.value).subscribe({
        next: (data) => {
          if(data) {
            this.dialog.open(SuccessModalComponent,{
              data: {
                  message: 'El tipo de propiedad ha sido creada',
                  route: '/dashboard/property-types'
                }
              })
          }
        },
        error: () => {
          this.dialog.open(ErrorModalComponent, {
            data: 'Hubo un error. Por favor intente mas tarde'
          })
        }
      });
    } else {
      alert('Por favor, rellene todos los campos obligatorios.');
    }
  }

  updatePropertyType(propertyType: PropertyType) {
    if (this.propertyTypeForm.valid) {
      const formData = {
        id: this.propertyType?.id,
        description: this.propertyTypeForm.get('description')?.value,
      };
      this.loading = true;
      this.cdr.detectChanges();

      this.propertyTypeService.updatePropertyType(propertyType.id, formData).subscribe({
        next: data => {
          this.loading = false;
          this.cdr.detectChanges();
          if(data){
            this.dialog.open(SuccessModalComponent,{
              data: {
                  message: 'El tipo de propiedad se ha actualizado',
                  route: '/dashboard/property-types'
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

}
