import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent {
  @Input() entities: any[] = []; 

  onRowClick(entity: any): void {
    console.log('Row clicked:', entity); 
  }
}
