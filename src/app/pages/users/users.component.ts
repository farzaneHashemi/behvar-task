import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      organizationUnit: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: [''],
      education: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  addUser(user: User): void {
    this.userService.addUser(user); 
    this.userForm.reset();
    this.users = this.userService.getUsers(); 
  }

  getValidationMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required. Please fill it out!`;
    }
    return '';
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('submit user', this.userForm.value);
      this.userService.addUser(this.userForm.value);
    }
    else console.log('invalide form!');

  }
}
