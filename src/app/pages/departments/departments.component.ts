import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  newDepartment: Department = {
    id: 0,
    name: '',
    status: 'active',
    establishmentDate: new Date()
  };

  ngOnInit() {
    //fetch initial list of departments or initialize data
  }

  addDepartment() {
  }
}
