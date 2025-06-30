import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoComponent } from './pedidos.component';

describe('PedidosComponent', () => {
  let component: PedidoComponent;
  let fixture: ComponentFixture<PedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
