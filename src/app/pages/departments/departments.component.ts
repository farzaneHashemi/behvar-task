import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { switchMap, finalize } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departmentForm: FormGroup;
  departments: Department[] = [];
  departmentUsers: User[] = [];
  loading: boolean = false;


  constructor(
    private fb: FormBuilder, 
    private departmentService: DepartmentService,
    private userService: UserService) {
    this.departmentForm = this.fb.group({
      id: ['', Validators.required],
      // id: ['', Validators.required, Validators.pattern(/^\d+$/)],
      name: ['', Validators.required],
      status: ['', Validators.required],
      establishedDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.loading = true;
    this.departmentService.getDepartments().pipe(
      switchMap((data) => {
        this.departments = data;
        return timer(500); // delay
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  fetchDepartmentUsers(departmentId: any): void {
    console.log("fetchDepartmentUsers input ", departmentId)
    this.userService.getUsersByDepartment(departmentId).subscribe((users: User[]) => {
      this.departmentUsers = users;
    });
    console.log("fetchDepartmentUsers", this.departmentUsers)
  }

  addDepartment(department: Department): void {
    this.departmentService.addDepartment(department); 
    this.departmentForm.reset();
    this.departmentService.getDepartments().subscribe((data: Department[]) => {
      this.departments = data;
      console.log('deps list fetched')
    });
  }

  getValidationMessage(controlName: string): string {
    const control = this.departmentForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required. Please fill it out!`;
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'id') {
        return 'ID must contain only digits.';
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      this.departmentService.addDepartment(this.departmentForm.value).subscribe({
        next: (response: Department) => {
          console.log("dept added", response)
          this.departments.push(response)
        },
        error: (error: any) => {
          console.log("could not add dept, error is ", error)
        }
      })
      console.log('submit dept', this.departmentForm.value);
      
    } else console.log('not valid form')

  }

}
