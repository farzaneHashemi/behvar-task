import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('EntityFormComponent', () => {
  let component: EntityFormComponent;
  let fixture: ComponentFixture<EntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
