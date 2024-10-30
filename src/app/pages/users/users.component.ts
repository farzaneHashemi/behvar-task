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
      id: ['', [Validators.required]],
      name: ['', Validators.required],
      departmentId: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: [''],
      educationLevel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchUsers();  
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  addUser(user: User): void {
    this.userService.addUser(user); 
    this.userForm.reset();
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });  
  }

  getValidationMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required. Please fill it out!`;
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'phoneNumber') {
        return 'Phone number must be 11 digits.';
      }
      if (controlName === 'id') {
        return 'ID must contain only digits.';
      }
    }
    return '';
  }

  // getValidationMessage(controlName: string): string {
  //   const control = this.userForm.get(controlName);
  //   if (control?.hasError('required')) {
  //     return `${controlName} is required.`;
  //   }
  //   if (control?.hasError('pattern')) {
  //     if (controlName === 'phoneNumber') {
  //       return 'Phone number must be 11 digits.';
  //     }
  //     if (controlName === 'id') {
  //       return 'ID must contain only digits.';
  //     }
  //   }
  //   return '';
  // }

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
