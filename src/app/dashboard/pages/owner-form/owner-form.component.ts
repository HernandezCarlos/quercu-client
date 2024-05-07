import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwnerService } from '../../../services/owner.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../../shared/error-modal/error-modal.component';
import { SuccessModalComponent } from '../../../shared/success-modal/success-modal.component';
import { Owner } from '../../../models/owner.interface';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-owner-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModalComponent,
    RouterModule,
    SvgIconComponent
  ],
  templateUrl: './owner-form.component.html',
  styleUrl: './owner-form.component.scss',
})
export default class OwnerFormComponent {

  ownerForm: FormGroup;
  owner: Owner;
  loading: boolean = false;
  private ownerService = inject(OwnerService);

  constructor(private fb: FormBuilder, public dialog: MatDialog,  private location: Location, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
   this.initForm();
   const state = this.location.getState();
   this.owner = state['owner'];
   if (this.owner) {
      this.fillForm();
    }
  }

  initForm() {
    this.ownerForm = this.fb.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['',  Validators.email],
      identificationNumber: ['', Validators.required],
      address: ['']
    });
  }

  fillForm() {
    this.ownerForm.patchValue({
      name: this.owner.name,
      telephone: this.owner.telephone,
      email: this.owner.email,
      identificationNumber: this.owner.identificationNumber,
      address: this.owner.address
   });
  }

  onSubmit() {
    if (this.ownerForm.valid) {
      this.ownerService.createOwner(this.ownerForm.value).subscribe({
        next: (data) => {
          if(data) {
            this.dialog.open(SuccessModalComponent,{
              data: {
                  message: 'El dueño ha sido creado',
                  route: '/dashboard/owners'
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

  updateOwner(owner: Owner) {
    if (this.ownerForm.valid) {
      const formData = {
        id: this.owner?.id,
        name: this.ownerForm.get('name')?.value,
        telephone: this.ownerForm.get('telephone')?.value,
        email: this.ownerForm.get('email')?.value,
        identificationNumber: this.ownerForm.get('identificationNumber')?.value,
        address: this.ownerForm.get('address')?.value
      };
      this.loading = true;
      this.cdr.detectChanges();

      this.ownerService.updateOwner(owner.id, formData).subscribe({
        next: data => {
          this.loading = false;
          this.cdr.detectChanges();
          if(data){
            this.dialog.open(SuccessModalComponent,{
              data: {
                  message: 'El dueño se ha actualizado',
                  route: '/dashboard/owners'
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
