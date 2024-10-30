import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent {
  @Input() entities: any[] = []; 
  @Input() isDepartmentList = false;
  @Input() departmentUsers: User[] = [];
  @Output() departmentClicked = new EventEmitter<number>();
  @Output() entitySelected = new EventEmitter<number>();

  selectedEntityId: number | null = null;
  filteredUsers: User[] = [];
  dropdownOpen = false; 


  ngOnInit(): void {}


  ngOnChanges(changes: SimpleChanges) {
    // if (changes['users']) {
    //   // Update departmentUsers if selectedEntityId is already set
    //   if (this.selectedEntityId !== null) {
    //     this.departmentUsers = this.getDepartmentUsers(this.selectedEntityId);
    //   }
    // }
  }

  toggleEntity(entityId: number): void {
    this.selectedEntityId = this.selectedEntityId === entityId ? null : entityId;
    if (this.isDepartmentList && this.selectedEntityId) {
      this.entitySelected.emit(entityId);
    }
}

  onUserClick(user: User): void {
    console.log('User clicked:', user);
  }

  onRowClick(departmentId: number): void {
    this.departmentClicked.emit(departmentId);
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation(); //prevents click from affecting row selection
    this.dropdownOpen = !this.dropdownOpen;
  }
}
