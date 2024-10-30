import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailDialogComponent } from '../../user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent {
  @Input() entities: any[] = []; 
  @Input() isDepartmentList: boolean = false;
  @Input() departmentUsers: User[] = [];
  @Output() departmentClicked = new EventEmitter<number>();
  @Output() entitySelected = new EventEmitter<number>();

  selectedEntityId: number | null = null;
  dropdownOpen = false; 

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openUserDetailDialog(user: User): void {
    this.dialog.open(UserDetailDialogComponent, {
      width: '400px',
      height: 'auto',
      data: user,
      position: { top: '50%', left: '50%' },
      panelClass: 'centered-dialog'
    });
  }

  toggleEntity(entity: any): void {
    if (this.isDepartmentList) {
      this.selectedEntityId = this.selectedEntityId === entity.id ? null : entity.id;
      if (this.isDepartmentList && this.selectedEntityId) {
        this.entitySelected.emit(entity.id);
      }
    } 
    else {
      this.openUserDetailDialog(entity);
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
