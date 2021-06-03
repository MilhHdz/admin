export interface Cliente {
    id?: number;
    nombre: string;
    ape_pat: string;
    ape_mat: string;
    telefono?: string;
    automovil?: string;
    modelo?: number;
    ano?: number;
    correo?: string;
    calle?: string;
    numero?: string;
    ciudad?: string;
    codigo_Postal?: string;
    rfc?: string;
    razon_social?: string;
}

export let CLIENTES: Cliente[] = [
    {
        id: 1,
        nombre: 'Juan',
        ape_pat: 'Amenta',
        ape_mat: 'Cruz',
    },
    {
        id: 2,
        nombre: 'Fernanda',
        ape_pat: 'López',
        ape_mat: 'Velasco',
    },
    {
        id: 3,
        nombre: 'Luis',
        ape_pat: 'Montes',
        ape_mat: 'Montes',
    },
    {
        id: 4,
        nombre: 'Ana',
        ape_pat: 'Martinez',
        ape_mat: 'Castro',
    },
];
