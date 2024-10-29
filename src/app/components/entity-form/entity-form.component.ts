import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  @Input() entityData: any; 
  @Output() formSubmit = new EventEmitter<any>(); 

  entityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
      establishmentDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.entityData) {
      this.entityForm.patchValue(this.entityData); 
    }
  }

  onSubmit(): void {
    if (this.entityForm.valid) {
      this.formSubmit.emit(this.entityForm.value);
      this.entityForm.reset(); 
    }
  }
}
