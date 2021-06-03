import { Injectable } from '@angular/core';
import { SistemasData } from '../data/sistemas';

@Injectable()
export class SistemasService extends SistemasData {
    data = [
        {
            id: 1,
            nombre: 'Hidraulico',
        },
        {
            id: 2,
            nombre: 'Aire',
        },
        {
            id: 3,
            nombre: 'Electronico',
        },
    ];

    getData() {
        return this.data;
    }
}
