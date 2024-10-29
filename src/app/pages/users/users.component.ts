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
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });  
  }

  addUser(user: User): void {
    this.userService.addUser(user); 
    this.userForm.reset();
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });  }

  getValidationMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required. Please fill it out!`;
    }
    return '';
  }

  onSubmit(): any {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (response: User) => {
          console.log('User added successfully:', response);
          this.users.push(response);
        },
        error: (error: any) => {
          console.error('Error adding user:', error);
        },
      });
    } else {
      console.log('Invalid form!');
    }
  }
  
}
