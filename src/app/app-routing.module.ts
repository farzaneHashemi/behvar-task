import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DepartmentsComponent} from '../app/pages/departments/departments.component'

const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: '', redirectTo: '/departments', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
