import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Productos',
        icon: { icon: 'toolbox', pack: 'fas' },
        link: '/dashboard/productos',
        home: true,
    },
    {
        title: 'Clientes',
        icon: { icon: 'user', pack: 'fas' },
        link: '/dashboard/clientes',
    },
    {
        title: 'Personal',
        icon: { icon: 'people-carry', pack: 'fas' },
        link: '/dashboard/vendedor'
    },
    {
        title: 'Cotización',
        icon: { icon: 'sticky-note', pack: 'fas' },
        link: '/dashboard/cotizacion'
    },
    {
        title: 'Caja',
        icon: { icon: 'cash-register', pack: 'fas' },
        link: '/dashboard/ventas'
    },
    {
        title: 'Sagaji',
        icon: { icon: 'cogs', pack: 'fas' },
        link: '/dashboard/sagaji',
    },
    {
        title: 'Más herramientas',
        expanded: true,
        icon: { icon: 'clipboard', pack: 'fas'},
        children: [
            {
                title: 'Categorías',
                icon: { icon: 'list-ul', pack: 'fas' },
                link: '/dashboard/categorias',
            },
            {
                title: 'Armadoras',
                icon: { icon: 'cog', pack: 'fas' },
                link: '/dashboard/armadoras',
            },
            {
                title: 'Lineas',
                icon: { icon: 'tag', pack: 'fas' },
                link: '/dashboard/lineas',
            },
            {
                title: 'Proveedores',
                icon: { icon: 'parachute-box', pack: 'fas' },
                link: '/dashboard/proveedores',
            },
            {
                title: 'Facturas',
                icon: { icon: 'file-invoice', pack: 'fas' },
                link: '/dashboard/facturas',
            },
        ]
    },
];
