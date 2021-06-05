export class Select2 {
    'clclave': string;
    'descripcion': string;
}


export class Select3 {
    'clclave': string;
    'descripcion': string;
}


export class Select4 {
    'clclave': string;
    'descripcion': string;
}

export class Producto {
    'clfilial': string;
    'clproducto': string;
    'estatus_compra': string;
    'dsproducto': string;
    'unidadmedida': string;
    'multiploventa': string;
    'cveprodser': string;
    'dslinea': string;
    'dscategoria': string;
    'preciocosto': string;
    'preciocostoiva': string;
    'preciopromocion': string;
    'existencia': string;
    'existencias': string;
    'promocion': string;
    'cldisponibilidad': string;
}

export interface Aplicaciones {
    armadora: string;
    categoria: string;
    cdescripcion: string;
    cilindro: string;
    clfilial: string;
    clproducto: string;
    descripcion: string;
    especificacion: string;
    linea: string;
    modelo: string;
    motor: string;
    periodof: string;
    periodoi: string;
}

export interface Equivalencias {
    clfilial: string;
    clproducto: string;
    clequivalente: string;
    dsproducto: string;
    preciocosto: string;
    preciocostoiva: string;
    existencia: string;
    multiploventa: string;
    existencias: string;
    dslinea: string;
}
