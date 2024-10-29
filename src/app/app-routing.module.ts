import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DepartmentsComponent} from '../app/pages/departments/departments.component'
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/departments', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
