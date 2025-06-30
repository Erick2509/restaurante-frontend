import { Component, OnInit } from '@angular/core';
import { ClientesService } from './services/clientes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  cargando: boolean = true;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clientesService.getClientes().subscribe(data => {
      this.clientes = data;
      this.cargando = false;
    });
  }
}
