import { Injectable } from '@angular/core';
import { ArmadorasData } from '../data/armadoras';

@Injectable()
export class ArmadorasService extends ArmadorasData {
  data = [
    { id: 1, nombre: 'Renault' },
    { id: 2, nombre: 'NISSAN' },
    { id: 3, nombre: 'ISUZU' },
    { id: 4, nombre: 'HINO' },
    { id: 5, nombre: 'CHEVROLET' },
    { id: 6, nombre: 'GMC' },
    { id: 7, nombre: 'HUMMER' },
    { id: 8, nombre: 'CADILAC' },
    { id: 9, nombre: 'FORD' },
    { id: 10, nombre: 'DODGE' },
    { id: 11, nombre: 'KIA' },
    { id: 12, nombre: 'HYUNDAI' },
    { id: 13, nombre: 'MAZDA' },
  ];

  getData() {
    return this.data;
  }
}
