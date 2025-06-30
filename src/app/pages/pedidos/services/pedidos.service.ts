import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface PedidoPlato {
  platoId: number;
  cantidad: number;
}

export interface Pedido {
  id?: number;
  estado: string;
  metodoPago: string;
  tipoEntrega?: string;
  total: number;
  platos: PedidoPlato[];
  fechaRegistro?: string;
  cliente_id?: string;
}

export interface PedidoDTO {
  mesaId: number;
  estado: string;
  metodoPago: string;
  total: number;
  platos: PedidoPlato[];
  fecha_creacion?: string;
}

export interface PedidoDetalleResponse {
  pedido: {
    id: number;
    tipo_entrega?: string;
    metodo_pago?: string;
    estado?: string;
    total?: number;
    fecha_creacion?: string;
  };
  detalles: {
    plato_id: number;
    nombre: string;
    precio: number;
    cantidad: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = environment.apiUrl + '/pedidos';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(pedidos =>
        pedidos.map(p => ({
          id: p.id,
          estado: p.estado,
          metodoPago: p.metodo_pago,
          tipoEntrega: p.tipo_entrega,
          total: +p.total,
          platos: p.platos,
          fechaRegistro: p.fecha_creacion
        }))
      )
    );
  }

  crearPedido(pedido: PedidoDTO): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  actualizarPedido(id: number, pedido: Pedido): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pedido);
  }

  eliminarPedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  cambiarEstado(id: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/estado`, { estado: nuevoEstado });
  }

  getDetallePedido(id: number): Observable<PedidoDetalleResponse> {
    return this.http.get<PedidoDetalleResponse>(`${this.apiUrl}/${id}/detalle`);
  }
}
