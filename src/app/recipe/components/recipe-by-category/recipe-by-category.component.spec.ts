import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeByCategoryComponent } from './recipe-by-category.component';

describe('RecipeByCategoryComponent', () => {
  let component: RecipeByCategoryComponent;
  let fixture: ComponentFixture<RecipeByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeByCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
