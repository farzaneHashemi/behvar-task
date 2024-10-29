import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departmentsSource = new BehaviorSubject<any[]>([]);
  departments$ = this.departmentsSource.asObservable();

  private departments: any[] = [];
  private apiUrl = 'http://localhost:3000/departments';

  constructor(private http: HttpClient) {}

  addDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }
}
