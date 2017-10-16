import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenateComponent } from './pagenate.component';

describe('PagenateComponent', () => {
  let component: PagenateComponent;
  let fixture: ComponentFixture<PagenateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagenateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
