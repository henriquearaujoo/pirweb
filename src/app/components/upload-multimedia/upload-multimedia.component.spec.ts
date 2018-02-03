import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultimediaComponent } from './upload-multimedia.component';

describe('UploadMultimediaComponent', () => {
  let component: UploadMultimediaComponent;
  let fixture: ComponentFixture<UploadMultimediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMultimediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMultimediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
