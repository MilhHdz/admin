import { Injectable } from '@angular/core';
import { CategoriasData } from '../data/categorias';

@Injectable()
export class CategoriasService extends CategoriasData {
  data = [
    {
      id: 1,
      nombre: 'FRENOS',
    },
    {
      id: 2,
      nombre: 'MOTOR',
    }, {
      id: 3,
      nombre: 'ENFRIAMIENTO',
    },
  ];

  getData() {
    return this.data;
  }
}
