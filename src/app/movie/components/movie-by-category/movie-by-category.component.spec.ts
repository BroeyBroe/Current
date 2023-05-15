import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieByCategoryComponent } from './movie-by-category.component';

describe('MovieByCategoryComponent', () => {
  let component: MovieByCategoryComponent;
  let fixture: ComponentFixture<MovieByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieByCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
