import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPlatos',
  standalone: true
})
export class FilterPlatosPipe implements PipeTransform {
  transform(platos: any[], filtro: string): any[] {
    if (!filtro) return platos;
    const termino = filtro.toLowerCase();
    return platos.filter(plato =>
      plato.nombre.toLowerCase().includes(termino)
    );
  }
}
