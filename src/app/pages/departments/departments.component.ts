import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departmentForm: FormGroup;
  departments: Department[] = [];

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
      establishedDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Initialize or fetch existing departments if needed
    this.departments = this.departmentService.getDepartments(); 
  }

  addDepartment(department: Department): void {
    this.departmentService.addDepartment(department); 
    this.departmentForm.reset();
    this.departments = this.departmentService.getDepartments(); // Refresh the departments list
  }

  getValidationMessage(controlName: string): string {
    const control = this.departmentForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required. Please fill it out!`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const formData = this.departmentForm.value;
      console.log('submit dept', formData);
      this.departmentService.addDepartment(this.departmentForm.value)
    } else console.log('not valid form')

  }

}
