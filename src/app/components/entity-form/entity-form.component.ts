import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  departmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.departmentForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
      establishmentDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.formSubmit.emit(this.departmentForm.value);
      this.departmentForm.reset();
    } else {
      this.departmentForm.markAllAsTouched(); // Mark all fields as touched for validation
    }
  }
}
