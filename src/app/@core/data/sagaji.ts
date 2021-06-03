export class select2 {
    "clclave": string;
    "descripcion": string;
}


export class select3 {
    "clclave": string;
    "descripcion": string;
}


export class select4 {
    "clclave": string;
    "descripcion": string;
}

export class producto {
    "clfilial": string;
    "clproducto": string;
    "estatus_compra": string;
    "dsproducto": string;
    "unidadmedida": string;
    "multiploventa": string;
    "cveprodser": string;
    "dslinea": string;
    "dscategoria": string;
    "preciocosto": string;
    "preciocostoiva": string;
    "preciopromocion": string;
    "existencia": string;
    "existencias": string;
    "promocion": string;
    "cldisponibilidad": string;
}

export interface aplicaciones {
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

export interface equivalencias {
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