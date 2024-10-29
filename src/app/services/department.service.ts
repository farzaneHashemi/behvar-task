import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departmentsSource = new BehaviorSubject<any[]>([]);
  departments$ = this.departmentsSource.asObservable();

  private departments: any[] = [];

  addDepartment(department: any): void {
    this.departments.push(department);
    this.departmentsSource.next(this.departments);
  }

  getDepartments(): any[] {
    return this.departments;
  }
}
