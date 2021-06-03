import { Injectable } from '@angular/core';
import { ProductosData } from '../data/productos';

@Injectable()
export class ProductosService extends ProductosData {
    data = [
        {
            id: 1,
            categoria: 'Chasis',
            armadora: 'Grasa para chasis',
            linea: 'GPT-50',
            sistema: 'Hidraulico',
          }, {
            id: 2,
            categoria: 'Motor',
            armadora: 'Aceite de motor 50',
            linea: 'Roshfrans',
            sistema: 'Hidraulico',
          }, {
            id: 3,
            categoria: 'Filtro',
            armadora: 'Filtro de aire',
            linea: 'GPT-50',
            sistema: 'Aire',
          },
    ];

    getData() {
        return this.data;
    }
}
