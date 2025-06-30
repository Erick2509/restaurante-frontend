import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleadosService, Empleado } from './services/empleados.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  nuevoEmpleado: Empleado = {
    nombre: '',
    apellido: '',
    dni: '',
    cargo: '',
    telefono: '',
    estado: 'disponible'
  };
  editando: boolean = false;
  mensaje: string = '';

  // MODAL
  mostrarModal: boolean = false;
  empleadoAEliminar: number | null = null;

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
  }

  guardar(): void {
    if (this.editando && this.nuevoEmpleado.id) {
      this.empleadosService.actualizarEmpleado(this.nuevoEmpleado.id, this.nuevoEmpleado).subscribe(() => {
        this.mostrarMensaje('✅ Empleado actualizado correctamente');
        this.resetFormulario();
        this.cargarEmpleados();
      });
    } else {
      this.empleadosService.agregarEmpleado(this.nuevoEmpleado).subscribe(() => {
        this.mostrarMensaje('✅ Empleado guardado correctamente');
        this.resetFormulario();
        this.cargarEmpleados();
      });
    }
  }

  editar(empleado: Empleado): void {
    this.nuevoEmpleado = { ...empleado };
    this.editando = true;
  }

  abrirModalEliminar(empleado: Empleado): void {
    this.empleadoAEliminar = empleado.id!;
    this.mostrarModal = true;
  }

  cancelarEliminar(): void {
    this.empleadoAEliminar = null;
    this.mostrarModal = false;
  }

  confirmarEliminar(): void {
    if (this.empleadoAEliminar) {
      this.eliminar(this.empleadoAEliminar);
      this.mostrarModal = false;
    }
  }

  eliminar(id: number): void {
    this.empleadosService.eliminarEmpleado(id).subscribe(() => {
      this.mostrarMensaje('🗑️ Empleado eliminado');
      this.cargarEmpleados();
    });
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevoEmpleado = {
      nombre: '',
      apellido: '',
      dni: '',
      cargo: '',
      telefono: '',
      estado: 'disponible'
    };
    this.editando = false;
  }

  mostrarMensaje(texto: string): void {
    this.mensaje = texto;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}
