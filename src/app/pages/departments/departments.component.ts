import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.departments$.subscribe(departments => {
      this.departments = departments;
    });
  }

  addDepartment(department: any): void {
    this.departmentService.addDepartment(department);
  }
}
