import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazPodatakaComponent } from './prikaz-podataka.component';

describe('PrikazPodatakaComponent', () => {
  let component: PrikazPodatakaComponent;
  let fixture: ComponentFixture<PrikazPodatakaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrikazPodatakaComponent]
    });
    fixture = TestBed.createComponent(PrikazPodatakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
