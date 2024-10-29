import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  departmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.departmentForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
      establishedDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Method to get customized validation messages
  getValidationMessage(controlName: string): string {
    const control = this.departmentForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required. Please fill it out!`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      console.log('Form Submitted!', this.departmentForm.value);
    } else {
      console.log('Form not valid');
    }
  }
}
