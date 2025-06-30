// src/app/pages/pedidos/pedidos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PedidoService, Pedido } from '../pedidos/services/pedidos.service';
import { PlatosService } from '../../services/platos.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  platosDisponibles: any[] = [];
  mensaje: string = '';
  mostrarDetalle: boolean = false;
  detallePedido: any[] = [];
  pedidoSeleccionadoId: number | null = null;
  pedidoSeleccionado: Pedido | null = null;

  constructor(
    private pedidoService: PedidoService,
    private platosService: PlatosService
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
    this.cargarPlatos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  cargarPlatos(): void {
    this.platosService.getPlatos().subscribe(data => {
      this.platosDisponibles = data;
    });
  }

  mostrarMensaje(texto: string): void {
    this.mensaje = texto;
    setTimeout(() => this.mensaje = '', 3000);
  }

  obtenerNombrePlato(id: number): string {
    const plato = this.platosDisponibles.find(p => p.id === id);
    return plato ? plato.nombre : 'Desconocido';
  }

  verDetalle(pedido: Pedido): void {
    this.pedidoSeleccionadoId = pedido.id!;
    this.pedidoSeleccionado = null;
    this.detallePedido = [];

    this.pedidoService.getDetallePedido(pedido.id!).subscribe(data => {
      // Mapear manualmente los campos que necesitas mostrar
      this.pedidoSeleccionado = {
        id: data.pedido.id,
        tipoEntrega: data.pedido.tipo_entrega || '',
        metodoPago: data.pedido.metodo_pago || '',
        estado: data.pedido.estado || '',
        total: data.pedido.total || 0,
        fechaRegistro: data.pedido.fecha_creacion || '',
        platos: []
      };

      this.detallePedido = data.detalles;
      this.mostrarDetalle = true;
    });
  }

  cerrarDetalle(): void {
    this.detallePedido = [];
    this.pedidoSeleccionadoId = null;
    this.mostrarDetalle = false;
  }

  cambiarEstado(pedido: Pedido): void {
    if (!pedido.id || !pedido.estado) return;

    this.pedidoService.cambiarEstado(pedido.id, pedido.estado).subscribe({
      next: () => {
        this.mostrarMensaje('✅ Estado actualizado en la base de datos');
        this.cargarPedidos();
      },
      error: () => {
        this.mostrarMensaje('❌ Error al actualizar el estado');
      }
    });
  }

  calcularTotalDetalle(): number {
    return this.detallePedido.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }
}
