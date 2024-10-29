import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent {
  @Input() entities: any[] = []; // Input to receive the list of entities

  onRowClick(entity: any): void {
    console.log('Row clicked:', entity); // Handle row click (e.g., for viewing details)
  }
}
