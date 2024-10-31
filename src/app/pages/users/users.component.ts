import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { switchMap, finalize } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  users: User[] = [];
  loading: boolean = false;


  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      name: ['', Validators.required],
      departmentId: ['', Validators.required, Validators.pattern(/^\d+$/)],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.pattern(/^\d{11}$/)]],
      educationLevel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchUsers();  
  }

  fetchUsers(): void {
    this.loading = true;
    this.userService.getUsers().pipe(
      switchMap((data) => {
        this.users = data;
        return timer(500); // delay
      }),
      finalize(() => this.loading = false)
    ).subscribe();
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
