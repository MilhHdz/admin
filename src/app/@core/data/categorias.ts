export abstract class CategoriasData {
    abstract getData(): any[];
}

export interface Categoria {
    id?: number;
    clave?: string;
    nombre: string;
}

export const CATEGORIAS: Categoria[] = [
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
