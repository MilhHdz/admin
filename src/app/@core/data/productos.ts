export abstract class ProductosData {
    abstract getData(): any[];
}

export interface Motor {
    id: number;
    nombre: string;
}

export interface Cilindro {
    id: number;
    nombre: string;
    motor: Motor[];
}

export interface Version {
    id: number;
    nombre: string;
    cilindros: Cilindro[];
}

export interface Modelo {
    id: number;
    nombre: string;
    version: Version[];
}

export interface Armadora {
    id: number;
    nombre: string;
    modelo?: Modelo[];
}

export interface Aplication {
    id?: number;
    armadora: string;
    modelo: string;
    version?: string;
    cilindros?: string;
    motor?: string;
    ano_inicial: string;
    ano_final: string;
}

export interface Country {
    id?: number;
    nombre: string;
    tipo: string;
    linea: string;
    categoria: string;
    parte: string; // ----------- clproducto ------------
    precio: string;
    uni_9na?: string;
    uni_pan?: string;
    uni_sup?: string;
    cola?: Aplication[];
}

export interface ProdPAD {
    id?: number;
    nombre: string;
    unidadmedida: string;
    tipo: string;
    linea: string;
    categoria: string;
    parte: string; // ----------- clproducto ------------
    precio: string;
    uni_9na?: string;
    uni_pan?: string;
    uni_sup?: string;
}


export interface AddPAD {
    nombre: string;
    unidadmedida: string;
    tipo: string;
    linea: string;
    categoria: string;
    parte: string; // ----------- clproducto ------------
    precio: string;
    uni_9na?: string;
    uni_pan?: string;
    uni_sup?: string;
}


export interface Año {
    id: number;
    ano: number;
}

export const AÑOS: Año[] = [
    {
        id: 1,
        ano: 1960,
    },
    {
        id: 2,
        ano: 1961,
    },
    {
        id: 3,
        ano: 1962,
    },
    {
        id: 4,
        ano: 1963,
    },
    {
        id: 5,
        ano: 1964,
    },
    {
        id: 6,
        ano: 1965,
    },
    {
        id: 7,
        ano: 1966,
    },
    {
        id: 8,
        ano: 1967,
    },
    {
        id: 9,
        ano: 1968,
    },
    {
        id: 10,
        ano: 1969,
    },
    {
        id: 11,
        ano: 1970,
    },
    {
        id: 12,
        ano: 1971,
    },
    {
        id: 13,
        ano: 1972,
    },
    {
        id: 14,
        ano: 1973,
    },
    {
        id: 15,
        ano: 1974,
    },
    {
        id: 16,
        ano: 1975,
    },
    {
        id: 17,
        ano: 1976,
    },
    {
        id: 18,
        ano: 1977,
    },
    {
        id: 19,
        ano: 1978,
    },
    {
        id: 20,
        ano: 1979,
    },
    {
        id: 21,
        ano: 1980,
    },
    {
        id: 22,
        ano: 1981,
    },
    {
        id: 23,
        ano: 1982,
    },
    {
        id: 24,
        ano: 1983,
    },
    {
        id: 25,
        ano: 1984,
    },
    {
        id: 26,
        ano: 1985,
    },
    {
        id: 27,
        ano: 1986,
    },
    {
        id: 28,
        ano: 1987,
    },
    {
        id: 29,
        ano: 1988,
    },
    {
        id: 30,
        ano: 1989,
    },
    {
        id: 31,
        ano: 1990,
    },
    {
        id: 32,
        ano: 1991,
    },
    {
        id: 33,
        ano: 1992,
    },
    {
        id: 34,
        ano: 1993,
    },
    {
        id: 35,
        ano: 1994,
    },
    {
        id: 36,
        ano: 1995,
    },
    {
        id: 37,
        ano: 1996,
    },
    {
        id: 38,
        ano: 1997,
    },
    {
        id: 39,
        ano: 1998,
    },
    {
        id: 40,
        ano: 1999,
    },
    {
        id: 41,
        ano: 2000,
    },
    {
        id: 42,
        ano: 2001,
    },
    {
        id: 43,
        ano: 2002,
    },
    {
        id: 44,
        ano: 2003,
    },
    {
        id: 45,
        ano: 2004,
    },
    {
        id: 46,
        ano: 2005,
    },
    {
        id: 47,
        ano: 2006,
    },
    {
        id: 48,
        ano: 2007,
    },
    {
        id: 49,
        ano: 2008,
    },
    {
        id: 50,
        ano: 2009,
    },
    {
        id: 51,
        ano: 2010,
    },
    {
        id: 52,
        ano: 2011,
    },
    {
        id: 53,
        ano: 2012,
    },
    {
        id: 54,
        ano: 2013,
    },
    {
        id: 55,
        ano: 2014,
    },
    {
        id: 56,
        ano: 2015,
    },
    {
        id: 57,
        ano: 2016,
    },
    {
        id: 58,
        ano: 2017,
    },
    {
        id: 59,
        ano: 2018,
    },
    {
        id: 60,
        ano: 2019,
    },
    {
        id: 61,
        ano: 2020,
    },
];

export const ARMADORAS: string[] = [
    'Renault', 'NISSAN', 'ISUZU', 'HINO', 'CHEVROLET', 'GMC',
    'HUMMER', 'CADILAC', 'FORD', 'DODGE', 'KIA', 'HYUNDAI',
    'MAZDA',
];

export const MODELOS: string[] = [
    'Fluence', 'Duster', 'TSURU', 'SENTRA', 'TSUBAME', 'PICK UP',
    'URVAN', 'PATHFINDER', 'ICHI VAN', 'FRONTIER', 'ELF300', 'ELF400',
    '300', 'SILVERADO', 'SIERRA', 'H2', 'YUCON', 'SUBURBAN', 'AVALANCHE',
    'EXPRESS VAN', 'DTS', 'SONORA', 'SPARK', 'BEAT', 'FIGO', 'RAM 4000',
    'RAM 3500', 'RAM 2500', 'RAM 1500', 'ECONOLINE', 'SONIC', 'F550', 'F450', 'F350',
    'SPORTAGE', 'SONATA', 'TUCSON', '3', 'CX-3', 'MARCH', 'VERSA', 'NOTE', 'ECOLINE',
];

export const VERSIONES: string[] = [
    'Dinamique', '3', 'D21', 'D22', 'D23', 'FRONTIER', 'NP300', '716', '816', 'NG',
];

export const CILINDROS: string[] = [
    '4', 'L4', 'V8', 'V6', 'L6', 'V10',
];

export const CATEGORIAS: string[] = [
    'FRENOS', 'MOTOR', 'ENFRIAMIENTO',
];

export const LIENAS: string[] = [
    'FRITEC', 'AC DELCO', 'PRAUSA',
];

export const MOTORES: string[] = [
    '2.0 LITROS', '1.6 LITROS', '2.4 LITROS', '2.5 LITROS', '3.0 LITROS', '4.8 LITROS',
    '5.3 LITROS', '6.2 LITROS', '4.6 LITROS', '1.2 LITROS', '5.7 LITROS', '4.7 LITROS',
    '3.6 LITROS', '1.8 LITROS', '4.3 LITROS', '4.2 LITROS', '6.8 LITROS', '1.4 LITROS',
];

export const PARTES: string[] = [
    'M7389Z', 'M7228Z', 'OW1399ZV', 'OW1742ZV', 'SHD7697Z', 'M7652Z', 'SPC8801Z',
    'SPC8X53Z', 'SHD8508Z', 'SHD8507Z', 'OW1438ZV', 'OW2192ZV', 'OW1480ZV', 'SHD9249Z',
    'SPC8614Z', 'SPC9093Z', 'SPC8926Z', 'SPC8952Z', 'SPC8804',
];

export let COUNTRIES: Country[] = [
    {
        id: 1,
        nombre: 'BALATAS FRITEC',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: '',
        precio: '0',
        uni_9na: '2',
        uni_pan: '4',
        uni_sup: '',
        cola: [
            {
                id: 1,
                armadora: 'Renault',
                modelo: 'Fluence',
                version: 'Dinamique',
                cilindros: '4',
                motor: '2.0 litros',
                ano_inicial: '2011',
                ano_final: '2015',
            },
            {
                id: 2,
                armadora: 'Renault',
                modelo: 'Duster',
                version: 'Dinamique',
                cilindros: '4',
                motor: '2.0 litros',
                ano_inicial: '2014',
                ano_final: '2020',
            },
        ],
    },
    {
        id: 2,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'M7389Z',
        precio: '176.30',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'TSURU',
                version: '3',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '1992',
                ano_final: '2017',
            },
            {
                id: 2,
                armadora: 'NISSAN',
                modelo: 'SENTRA',
                version: '',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '1991',
                ano_final: '1994',
            },
            {
                id: 3,
                armadora: 'NISSAN',
                modelo: 'TSUBAME',
                version: '',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '1993',
                ano_final: '2004',
            },
        ],
    },
    {
        id: 3,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'M7228Z',
        precio: '227.58',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D21',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1986',
                ano_final: '2008',
            },
            {
                id: 2,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D22',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '2009',
                ano_final: '2015',
            },
            {
                id: 3,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'FRONTIER',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1998',
                ano_final: '2002',
            },
            {
                id: 4,
                armadora: 'NISSAN',
                modelo: 'URVAN',
                version: '',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '2000',
                ano_final: '2001',
            },
            {
                id: 5,
                armadora: 'NISSAN',
                modelo: 'PATHFINDER',
                version: '',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1987',
                ano_final: '1994',
            },
            {
                id: 6,
                armadora: 'NISSAN',
                modelo: 'ICHI VAN',
                version: '',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1987',
                ano_final: '1988',
            },
        ],
    },
    {
        id: 4,
        nombre: 'BALATAS TRASERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'OW1399ZV',
        precio: '362.94',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D21',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1986',
                ano_final: '2008',
            },
            {
                id: 2,
                armadora: 'NISSAN',
                modelo: 'FRONTIER',
                motor: '2.4 LITROS',
                ano_inicial: '1998',
                ano_final: '2013',
            },
            {
                id: 3,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D22',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '2009',
                ano_final: '2015',
            },
            {
                id: 4,
                armadora: 'NISSAN',
                modelo: 'URVAN',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '2000',
                ano_final: '2017',
            },
            {
                id: 5,
                armadora: 'NISSAN',
                modelo: 'PATHFINDER',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1989',
                ano_final: '1994',
            },
        ],
    },
    {
        id: 5,
        nombre: 'BALATAS TRASERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'OW1742ZV',
        precio: '689.85',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D23 Y NP300',
                cilindros: 'L4',
                motor: '2.5 LITROS',
                ano_inicial: '2016',
                ano_final: '2020',
            },
        ],
    },
    {
        id: 6,
        nombre: 'BALATAS DEL. Y TRAS.',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SHD7697Z',
        precio: '923.27',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'ISUZU',
                modelo: 'ELF300',
                cilindros: 'L4',
                motor: '3.0 LITROS',
                ano_inicial: '2008',
                ano_final: '2014',
            },
            {
                id: 2,
                armadora: 'ISUZU',
                modelo: 'ELF400',
                cilindros: 'L4',
                motor: '2.5 LITROS',
                ano_inicial: '2007',
                ano_final: '2014',
            },
            {
                id: 3,
                armadora: 'HINO',
                modelo: '300',
                version: '716',
                ano_inicial: '2008',
                ano_final: '2019',
            },
            {
                id: 4,
                armadora: 'HINO',
                modelo: '300',
                version: '816',
                ano_inicial: '2008',
                ano_final: '2019',
            },
        ],
    },
    {
        id: 7,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'M7652Z',
        precio: '455.06',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'CHEVROLET',
                modelo: 'SILVERADO',
                cilindros: 'V8',
                motor: '4.8 LITROS',
                ano_inicial: '2001',
                ano_final: '2010',
            },
            {
                id: 2,
                armadora: 'GMC',
                modelo: 'SIERRA',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2001',
                ano_final: '2010',
            },
            {
                id: 3,
                armadora: 'HUMMER',
                modelo: 'H2',
                cilindros: 'V8',
                motor: '6.2 LITROS',
                ano_inicial: '2003',
                ano_final: '2009',
            },
            {
                id: 4,
                armadora: 'GMC',
                modelo: 'YUCON',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2000',
                ano_final: '2008',
            },
            {
                id: 5,
                armadora: 'CHEVROLET',
                modelo: 'SUBURBAN',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2000',
                ano_final: '2007',
            },
            {
                id: 6,
                armadora: 'CHEVROLET',
                modelo: 'AVALANCHE',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2002',
                ano_final: '2006',
            },
            {
                id: 7,
                armadora: 'CHEVROLET',
                modelo: 'EXPRESS VAN',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2002',
                ano_final: '2006',
            },
            {
                id: 8,
                armadora: 'CADILAC',
                modelo: 'DTS',
                cilindros: 'V8',
                motor: '4.6 LITROS',
                ano_inicial: '2006',
                ano_final: '2006',
            },
            {
                id: 9,
                armadora: 'CHEVROLET',
                modelo: 'SONORA',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2000',
                ano_final: '2000',
            },
        ],
    },
    {
        id: 8,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SPC8801Z',
        precio: '346.82',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'CHEVROLET',
                modelo: 'SPARK',
                cilindros: 'L4',
                motor: '1.2 LITROS',
                ano_inicial: '2011',
                ano_final: '2016',
            },
            {
                id: 2,
                armadora: 'CHEVROLET',
                modelo: 'BEAT',
                cilindros: 'L4',
                motor: '1.2 LITROS',
                ano_inicial: '2018',
                ano_final: '2020',
            },
        ],
    },
    {
        id: 9,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SPC8X53Z',
        precio: '396.18',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'FORD',
                modelo: 'FIGO',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '2016',
                ano_final: '2020',
            },
        ],
    },
    {
        id: 10,
        nombre: 'BALATAS TRASERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SHD8508Z',
        precio: '552.38',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'DODGE',
                modelo: 'RAM 4000',
                cilindros: 'V8',
                motor: '5.7 LITROS',
                ano_inicial: '2010',
                ano_final: '2017',
            },
            {
                id: 2,
                armadora: 'DODGE',
                modelo: 'RAM 3500',
                cilindros: 'V8',
                motor: '5.7 LITROS',
                ano_inicial: '2009',
                ano_final: '2010',
            },
            {
                id: 3,
                armadora: 'DODGE',
                modelo: 'RAM 2500',
                cilindros: 'V8',
                motor: '4.7 LITROS',
                ano_inicial: '2009',
                ano_final: '2011',
            },
            {
                id: 4,
                armadora: 'DODGE',
                modelo: 'RAM 1500',
                cilindros: 'V6',
                motor: '3.6 LITROS',
                ano_inicial: '2011',
                ano_final: '2012',
            },
        ],
    },
    {
        id: 11,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SHD8507Z',
        precio: '651.29',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'DODGE',
                modelo: 'RAM 4000',
                cilindros: 'V8',
                motor: '5.7 LITROS',
                ano_inicial: '2010',
                ano_final: '2017',
            },
            {
                id: 2,
                armadora: 'DODGE',
                modelo: 'RAM 3500',
                cilindros: 'V8',
                motor: '5.7 LITROS',
                ano_inicial: '2009',
                ano_final: '2010',
            },
            {
                id: 3,
                armadora: 'DODGE',
                modelo: 'RAM 2500',
                cilindros: 'V8',
                motor: '4.7 LITROS',
                ano_inicial: '2009',
                ano_final: '2011',
            },
            {
                id: 4,
                armadora: 'DODGE',
                modelo: 'RAM 1500',
                cilindros: 'V6',
                motor: '3.6 LITROS',
                ano_inicial: '2011',
                ano_final: '2012',
            },
        ],
    },
    {
        id: 12,
        nombre: 'BALATAS TRASERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'OW1438ZV',
        precio: '216.53',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'TSURU',
                version: '3',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '1992',
                ano_final: '2017',
            },
            {
                id: 2,
                armadora: 'NISSAN',
                modelo: 'SENTRA',
                cilindros: 'L4',
                motor: '1.8 LITROS',
                ano_inicial: '1991',
                ano_final: '1992',
            },
            {
                id: 3,
                armadora: 'NISSAN',
                modelo: 'TSUBAME',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '1993',
                ano_final: '2004',
            },
        ],
    },
    {
        id: 13,
        nombre: 'BALATAS TRASERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'OW2192ZV',
        precio: '314',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'CHEVROLET',
                modelo: 'SILVERADO',
                cilindros: 'V6',
                motor: '4.3 LITROS',
                ano_inicial: '2005',
                ano_final: '2006',
            },
            {
                id: 2,
                armadora: 'CHEVROLET',
                modelo: 'AVALANCHE',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2003',
                ano_final: '2006',
            },
            {
                id: 3,
                armadora: 'CHEVROLET',
                modelo: 'SUBURBAN',
                cilindros: 'V8',
                motor: '5.7 LITROS',
                ano_inicial: '2004',
                ano_final: '2006',
            },
            {
                id: 4,
                armadora: 'HUMMER',
                modelo: 'H2',
                cilindros: 'V8',
                motor: '6.2 LITROS',
                ano_inicial: '2004',
                ano_final: '2004',
            },
            {
                id: 5,
                armadora: 'CHEVROLET',
                modelo: 'EXPRESS VAN',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2004',
                ano_final: '2004',
            },
            {
                id: 6,
                armadora: 'FORD',
                modelo: 'ECONOLINE',
                cilindros: 'L6',
                motor: '4.2 LITROS',
                ano_inicial: '1995',
                ano_final: '2000',
            },
        ],
    },
    {
        id: 14,
        nombre: 'BALATAS TRASERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'OW1480ZV',
        precio: '368.09',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'CHEVROLET',
                modelo: 'SONIC',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '2011',
                ano_final: '2016',
            },
        ],
    },
    {
        id: 15,
        nombre: 'BALATAS DEL. Y TRAS.',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SHD9249Z',
        precio: '904.52',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'FORD',
                modelo: 'F550',
                cilindros: 'V10',
                motor: '6.8 LITROS',
                ano_inicial: '2017',
                ano_final: '2019',
            },
            {
                id: 2,
                armadora: 'FORD',
                modelo: 'F450',
                cilindros: 'V10',
                motor: '6.8 LITROS',
                ano_inicial: '2017',
                ano_final: '2019',
            },
            {
                id: 3,
                armadora: 'FORD',
                modelo: 'F350',
                cilindros: 'V8',
                motor: '6.2 LITROS',
                ano_inicial: '2017',
                ano_final: '2019',
            },
        ],
    },
    {
        id: 16,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SPC8614Z',
        precio: '602.15',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'KIA',
                modelo: 'SPORTAGE',
                cilindros: 'L4',
                motor: '2.0 LITROS',
                ano_inicial: '2016',
                ano_final: '2017',
            },
            {
                id: 2,
                armadora: 'HYUNDAI',
                modelo: 'SONATA',
                cilindros: 'L4',
                motor: '2.0 LITROS',
                ano_inicial: '2015',
                ano_final: '2017',
            },
            {
                id: 3,
                armadora: 'HYUNDAI',
                modelo: 'TUCSON',
                cilindros: 'L4',
                motor: '2.0 LITROS',
                ano_inicial: '2015',
                ano_final: '2017',
            },
        ],
    },
    {
        id: 17,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SPC9093Z',
        precio: '379.37',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'CHEVROLET',
                modelo: 'SPARK',
                version: 'NG',
                cilindros: 'L4',
                motor: '1.4 LITROS',
                ano_inicial: '2016',
                ano_final: '2017',
            },
        ],
    },
    {
        id: 18,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SPC8926Z',
        precio: '450.96',
        cola: [
            {
                id: 1,
                armadora: 'CHEVROLET',
                modelo: 'SONIC',
                cilindros: 'L4',
                motor: '1.8 LITROS',
                ano_inicial: '2011',
                ano_final: '2017',
            },
        ],
    },
    {
        id: 19,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SPC8952Z',
        precio: '530',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'MAZDA',
                modelo: '3',
                cilindros: 'L4',
                motor: '2.0 LITROS',
                ano_inicial: '2015',
                ano_final: '2017',
            },
            {
                id: 2,
                armadora: 'MAZDA',
                modelo: 'CX-3',
                cilindros: 'L4',
                motor: '2.0 LITROS',
                ano_inicial: '2015',
                ano_final: '2017',
            },
        ],
    },
    {
        id: 20,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'SPC8804',
        precio: '278.64',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'MARCH',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '2011',
                ano_final: '2017',
            },
        ],
    },
    {
        id: 21,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'OW2192ZV',
        precio: '278.64',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'VERSA',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '2012',
                ano_final: '2017',
            },
            {
                id: 2,
                armadora: 'NISSAN',
                modelo: 'NOTE',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '2014',
                ano_final: '2017',
            },
        ],
    },
    {
        id: 22,
        nombre: 'BALATAS TRASERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'OW2192ZV',
        precio: '314',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'CHEVROLET',
                modelo: 'SILVERADO',
                cilindros: 'V6',
                motor: '4.3 LITROS',
                ano_inicial: '2005',
                ano_final: '2006',
            },
            {
                id: 2,
                armadora: 'CHEVROLET',
                modelo: 'AVALANCHE',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2003',
                ano_final: '2006',
            },
            {
                id: 3,
                armadora: 'CHEVROLET',
                modelo: 'SUBURBAN',
                cilindros: 'V8',
                motor: '5.7 LITROS',
                ano_inicial: '2004',
                ano_final: '2006',
            },
            {
                id: 4,
                armadora: 'HUMER',
                modelo: 'H2',
                cilindros: 'V8',
                motor: '6.2 LITROS',
                ano_inicial: '2004',
                ano_final: '2004',
            },
            {
                id: 5,
                armadora: 'CHEVROLET',
                modelo: 'EXPRESS VAN',
                cilindros: 'V8',
                motor: '5.3 LITROS',
                ano_inicial: '2004',
                ano_final: '2004',
            },
            {
                id: 6,
                armadora: 'FORD',
                modelo: 'ECOLINE',
                cilindros: 'L6',
                motor: '4.2 LITROS',
                ano_inicial: '1995',
                ano_final: '2000',
            },
        ],
    },
];

export let ALTERNATIVE: Country[] = [
    {
        id: 2,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'M7389Z',
        precio: '176.30',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'TSURU',
                version: '3',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '1992',
                ano_final: '2017',
            },
            {
                id: 2,
                armadora: 'NISSAN',
                modelo: 'SENTRA',
                version: '',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '1991',
                ano_final: '1994',
            },
            {
                id: 3,
                armadora: 'NISSAN',
                modelo: 'TSUBAME',
                version: '',
                cilindros: 'L4',
                motor: '1.6 LITROS',
                ano_inicial: '1993',
                ano_final: '2004',
            },
        ],
    },
    {
        id: 3,
        nombre: 'BALATAS DELANTERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'M7228Z',
        precio: '227.58',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D21',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1986',
                ano_final: '2008',
            },
            {
                id: 2,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D22',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '2009',
                ano_final: '2015',
            },
            {
                id: 3,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'FRONTIER',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1998',
                ano_final: '2002',
            },
            {
                id: 4,
                armadora: 'NISSAN',
                modelo: 'URVAN',
                version: '',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '2000',
                ano_final: '2001',
            },
            {
                id: 5,
                armadora: 'NISSAN',
                modelo: 'PATHFINDER',
                version: '',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1987',
                ano_final: '1994',
            },
            {
                id: 6,
                armadora: 'NISSAN',
                modelo: 'ICHI VAN',
                version: '',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1987',
                ano_final: '1988',
            },
        ],
    },
    {
        id: 4,
        nombre: 'BALATAS TRASERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'OW1399ZV',
        precio: '362.94',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D21',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1986',
                ano_final: '2008',
            },
            {
                id: 2,
                armadora: 'NISSAN',
                modelo: 'FRONTIER',
                motor: '2.4 LITROS',
                ano_inicial: '1998',
                ano_final: '2013',
            },
            {
                id: 3,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D22',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '2009',
                ano_final: '2015',
            },
            {
                id: 4,
                armadora: 'NISSAN',
                modelo: 'URVAN',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '2000',
                ano_final: '2017',
            },
            {
                id: 5,
                armadora: 'NISSAN',
                modelo: 'PATHFINDER',
                cilindros: 'L4',
                motor: '2.4 LITROS',
                ano_inicial: '1989',
                ano_final: '1994',
            },
        ],
    },
    {
        id: 5,
        nombre: 'BALATAS TRASERAS',
        tipo: 'BALATAS',
        linea: 'FRITEC',
        categoria: 'FRENOS',
        parte: 'OW1742ZV',
        precio: '689.85',
        uni_9na: '0',
        uni_pan: '0',
        uni_sup: '0',
        cola: [
            {
                id: 1,
                armadora: 'NISSAN',
                modelo: 'PICK UP',
                version: 'D23 Y NP300',
                cilindros: 'L4',
                motor: '2.5 LITROS',
                ano_inicial: '2016',
                ano_final: '2020',
            },
        ],
    },
];

export const SELECTS: Armadora[] = [
    {
        id: 1,
        nombre: 'Renault',
        modelo: [
            {
                id: 1,
                nombre: 'Fluence',
                version: [
                    {
                        id: 1,
                        nombre: 'Dinamique',
                        cilindros: [
                            {
                                id: 1,
                                nombre: '4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.0 litros',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                nombre: 'Duster',
                version: [
                    {
                        id: 1,
                        nombre: 'Dinamique',
                        cilindros: [
                            {
                                id: 1,
                                nombre: '4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.0 litros',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        nombre: 'NISSAN',
        modelo: [
            {
                id: 1,
                nombre: 'TSURU',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.6 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                nombre: 'SENTRA',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.6 LITROS',
                                    },
                                    {
                                        id: 2,
                                        nombre: '1.8 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 3,
                nombre: 'TSUBAME',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.6 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 4,
                nombre: 'PICK UP',
                version: [
                    {
                        id: 1,
                        nombre: 'D21',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: 'D22',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 3,
                        nombre: 'FRONTIER',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 4,
                        nombre: 'D23',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.5 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 5,
                        nombre: 'NP300',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.5 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 5,
                nombre: 'URVAN',
                version: [
                    {
                        id: 1,
                        nombre: 'FRONTIER',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 6,
                nombre: 'PATHFINDER',
                version: [
                    {
                        id: 1,
                        nombre: 'FRONTIER',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 7,
                nombre: 'ICHI VAN',
                version: [
                    {
                        id: 1,
                        nombre: 'FRONTIER',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 8,
                nombre: 'FRONTIER',
                version: [
                    {
                        id: 1,
                        nombre: 'D21',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 9,
                nombre: 'URVAN',
                version: [
                    {
                        id: 1,
                        nombre: 'D22',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 10,
                nombre: 'PATHFINDER',
                version: [
                    {
                        id: 1,
                        nombre: 'D22',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 11,
                nombre: 'MARCH',
                version: [
                    {
                        id: 1,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.6 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 12,
                nombre: 'VERSA',
                version: [
                    {
                        id: 1,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.6 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 13,
                nombre: 'NOTE',
                version: [
                    {
                        id: 1,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.6 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        nombre: 'ISUZU',
        modelo: [
            {
                id: 1,
                nombre: 'ELF300',
                version: [
                    {
                        id: 1,
                        nombre: 'D23',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '3.0 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: 'NP300',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '3.0 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                nombre: 'ELF400',
                version: [
                    {
                        id: 1,
                        nombre: 'D23',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.5 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: 'NP300',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.5 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        nombre: 'HINO',
        modelo: [
            {
                id: 1,
                nombre: '300',
                version: [
                    {
                        id: 1,
                        nombre: '716',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.5 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.5 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        nombre: 'CHEVROLET',
        modelo: [
            {
                id: 1,
                nombre: 'SILVERADO',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.8 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V6',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.3 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 3,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V6',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.3 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                nombre: 'SUBURBAN',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.8 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.7 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 3,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.7 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 3,
                nombre: 'AVALANCHE',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.8 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.3 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 3,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.3 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 4,
                nombre: 'EXPRESS VAN',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.8 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.3 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 3,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.3 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 5,
                nombre: 'SONORA',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.8 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 6,
                nombre: 'SPARK',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.2 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.4 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 7,
                nombre: 'BEAT',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.2 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 8,
                nombre: 'SONIC',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.6 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.8 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 6,
        nombre: 'GMC',
        modelo: [
            {
                id: 1,
                nombre: 'SIERRA',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.3 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                nombre: 'YUCON',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.3 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 7,
        nombre: 'HUMMER',
        modelo: [
            {
                id: 1,
                nombre: 'H2',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '6.2 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '6.2 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 3,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '6.2 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 8,
        nombre: 'CADILAC',
        modelo: [
            {
                id: 1,
                nombre: 'DTS',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.6 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 9,
        nombre: 'FORD',
        modelo: [
            {
                id: 1,
                nombre: 'FIGO',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '1.6 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                nombre: 'ECONOLINE',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L6',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.2 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L6',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.2 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 3,
                nombre: 'F550',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V10',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '6.8 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 4,
                nombre: 'F450',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V10',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '6.8 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 5,
                nombre: 'F350',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '6.2 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 10,
        nombre: 'DODGE',
        modelo: [
            {
                id: 1,
                nombre: 'RAM 4000',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.7 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                nombre: 'RAM 3500',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '5.7 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 3,
                nombre: 'RAM 2500',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V8',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '4.7 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 4,
                nombre: 'RAM 1500',
                version: [
                    {
                        id: 1,
                        nombre: '816',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'V6',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '3.6 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 11,
        nombre: 'KIA',
        modelo: [
            {
                id: 1,
                nombre: 'SPORTAGE',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.0 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 12,
        nombre: 'HYUNDAI',
        modelo: [
            {
                id: 1,
                nombre: 'SONATA',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.0 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                nombre: 'TUCSON',
                version: [
                    {
                        id: 1,
                        nombre: '3',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.0 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 13,
        nombre: 'MAZDA',
        modelo: [
            {
                id: 1,
                nombre: '3',
                version: [
                    {
                        id: 1,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.0 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                nombre: 'CX-3',
                version: [
                    {
                        id: 1,
                        nombre: 'NG',
                        cilindros: [
                            {
                                id: 1,
                                nombre: 'L4',
                                motor: [
                                    {
                                        id: 1,
                                        nombre: '2.0 LITROS',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
