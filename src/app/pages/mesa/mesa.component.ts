// src/app/pages/mesas/mesas.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MesasService, Mesa } from './services/mesa.service';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  mesas: Mesa[] = [];
  nuevaMesa: Mesa = {
    numero: 0,
    capacidad: 1,
    estado: 'libre'
  };
  editando: boolean = false;
  mensaje: string = '';

  // Validación
  formInvalido: boolean = false;

  // Modal de eliminación
  mostrarModal: boolean = false;
  mesaAEliminar: number | null = null;

  constructor(private mesasService: MesasService) {}

  ngOnInit(): void {
    this.cargarMesas();
  }

  cargarMesas(): void {
    this.mesasService.getMesas().subscribe(data => {
      this.mesas = data;
    });
  }

  guardar(): void {
    this.formInvalido =
      !this.nuevaMesa.numero ||
      this.nuevaMesa.numero < 1 ||
      !this.nuevaMesa.capacidad ||
      this.nuevaMesa.capacidad < 1 ||
      !this.nuevaMesa.estado;

    if (this.formInvalido) {
      this.mostrarMensaje('❌ Por favor, complete todos los campos correctamente.');
      return;
    }

    if (this.editando && this.nuevaMesa.id) {
      this.mesasService.actualizarMesa(this.nuevaMesa.id, this.nuevaMesa).subscribe(() => {
        this.mostrarMensaje('✅ Mesa actualizada correctamente');
        this.resetFormulario();
        this.cargarMesas();
      });
    } else {
      this.mesasService.agregarMesa(this.nuevaMesa).subscribe(() => {
        this.mostrarMensaje('✅ Mesa guardada correctamente');
        this.resetFormulario();
        this.cargarMesas();
      });
    }
  }

  editar(mesa: Mesa): void {
    this.nuevaMesa = { ...mesa };
    this.editando = true;
    this.formInvalido = false;
  }

  abrirModalEliminar(mesa: Mesa): void {
    this.mesaAEliminar = mesa.id!;
    this.mostrarModal = true;
  }

  cancelarEliminar(): void {
    this.mesaAEliminar = null;
    this.mostrarModal = false;
  }

  confirmarEliminar(): void {
    if (this.mesaAEliminar) {
      this.eliminar(this.mesaAEliminar);
      this.mostrarModal = false;
    }
  }

  eliminar(id: number): void {
    this.mesasService.eliminarMesa(id).subscribe(() => {
      this.mostrarMensaje('🗑️ Mesa eliminada');
      this.cargarMesas();
    });
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevaMesa = {
      numero: 0,
      capacidad: 1,
      estado: 'libre'
    };
    this.editando = false;
    this.formInvalido = false;
  }

  mostrarMensaje(texto: string): void {
    this.mensaje = texto;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}
