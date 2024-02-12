import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoCommandeComponent } from './histo-commande.component';

describe('HistoCommandeComponent', () => {
  let component: HistoCommandeComponent;
  let fixture: ComponentFixture<HistoCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoCommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
