import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditViewComponent } from './profile-edit-view.component';

describe('ProfileEditViewComponent', () => {
  let component: ProfileEditViewComponent;
  let fixture: ComponentFixture<ProfileEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
