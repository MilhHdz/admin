export abstract class LineasData {
    abstract getData(): any[];
}


export interface Linea {
    id?: number;
    nombre: string;
}

export const LINEAS: Linea[] = [
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
