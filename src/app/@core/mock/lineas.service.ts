import { Injectable } from '@angular/core';
import { LineasData } from '../data/lineas';

@Injectable()
export class LineasService extends LineasData {
    data = [
        {
            id: 1,
            nombre: 'FRITEC',
        },
        {
            id: 2,
            nombre: 'AC DELCO',
        },
        {
            id: 3,
            nombre: 'PRAUSA',
        },
    ];

    getData() {
        return this.data;
    }
}
