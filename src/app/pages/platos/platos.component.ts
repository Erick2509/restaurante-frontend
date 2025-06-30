// src/app/pages/platos/platos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlatosService, Plato } from '../../services/platos.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-platos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {
  platos: Plato[] = [];
  nuevoPlato: Plato = { nombre: '', descripcion: '', precio: 0, categoria: '', imagenUrl: '' };
  editando: boolean = false;
  mensaje: string = '';

  selectedFile?: File;
  vistaPrevia: string | ArrayBuffer | null = null;

  constructor(
    private platosService: PlatosService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.cargarPlatos();
  }

  cargarPlatos(): void {
    this.platosService.getPlatos().subscribe(data => {
      this.platos = data;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile && !this.selectedFile.type.startsWith('image/')) {
      alert('Solo se permiten archivos de imagen');
      this.selectedFile = undefined;
      this.vistaPrevia = null;
      return;
    }

    if (this.selectedFile && this.selectedFile.size > 2 * 1024 * 1024) {
      alert('La imagen debe pesar menos de 2 MB');
      this.selectedFile = undefined;
      this.vistaPrevia = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.vistaPrevia = reader.result;
    };

    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  guardar(): void {
    if (!this.editando && !this.selectedFile) {
      alert('⚠️ Debes seleccionar una imagen antes de guardar un nuevo plato.');
      return;
    }

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'restaurante_preset');

      // URL de subida a Cloudinary
      this.http.post<any>('https://api.cloudinary.com/v1_1/dpqfvvran/image/upload', formData)
        .subscribe(response => {
          this.nuevoPlato.imagenUrl = response.secure_url;
          this.guardarPlato();
        }, error => {
          alert('Error al subir la imagen');
          console.error(error);
        });

    } else {
      this.guardarPlato();
    }
  }


  private guardarPlato(): void {
    if (this.editando && this.nuevoPlato.id) {
      this.platosService.actualizarPlato(this.nuevoPlato.id, this.nuevoPlato).subscribe(() => {
        this.mostrarMensaje('✅ Plato actualizado correctamente');
        this.resetFormulario();
        this.cargarPlatos();
      });
    } else {
      this.platosService.agregarPlato(this.nuevoPlato).subscribe(() => {
        this.mostrarMensaje('✅ Plato guardado correctamente');
        this.resetFormulario();
        this.cargarPlatos();
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este plato?')) {
      this.platosService.eliminarPlato(id).subscribe(() => {
        this.mostrarMensaje('🗑️ Plato eliminado');
        this.cargarPlatos();
      });
    }
  }

  editar(plato: Plato): void {
    this.nuevoPlato = { ...plato };
    this.vistaPrevia = plato.imagenUrl || null;
    this.selectedFile = undefined;
    this.editando = true;
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevoPlato = { nombre: '', descripcion: '', precio: 0, categoria: '', imagenUrl: '' };
    this.vistaPrevia = null;
    this.selectedFile = undefined;
    this.editando = false;
  }

  mostrarMensaje(texto: string): void {
    this.mensaje = texto;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  // PAGINACIÓN
  paginaActual: number = 1;
  platosPorPagina: number = 5;

  get totalPaginas(): number {
    return Math.ceil(this.platos.length / this.platosPorPagina);
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) this.paginaActual--;
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) this.paginaActual++;
  }
}
