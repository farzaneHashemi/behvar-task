import { Component } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = []; 

  addUser(user: User) {
    this.users.push(user); 
    console.log('User added:', user); 
  }
}
