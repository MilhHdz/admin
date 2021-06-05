import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Select2, Select3, Select4, Producto, Aplicaciones, Equivalencias } from '../../../@core/data/sagaji';
import { AddPAD } from '../../../@core/data/productos';
import { DataService } from 'app/services/data.service';
import { Observable } from 'rxjs';


import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngx-sagaji',
    templateUrl: './sagaji.component.html',
    styleUrls: ['./sagaji.component.scss'],
    providers: [DecimalPipe],
})
export class SagajiComponent {

    // Sagaji
    opcion1: string[] = ['ArmadoraModeloDescripcion', 'LineaDescripcionModelo', 'DescripcionModeloLinea', 'ModeloDescripcionPeriodo'];
    opcion2: Select2[];
    opcion3: Select3[];
    opcion4: Select4[];
    productos$: Producto[];

    addprod: AddPAD = {
        'nombre': '', 'unidadmedida': '', 'tipo': '',
        'linea': '', 'categoria': '', 'parte': '',
        'precio': '', 'uni_9na': '', 'uni_pan': '', 'uni_sup': '',
    };

    app: Aplicaciones[];
    equi: Equivalencias[];
    opciones: boolean = false;


    // Descripcion
    dsproducto: string = '';
    dslinea: string = '';
    clproducto: string = '';
    unimedida: string = '';
    dscategoria: string = '';

    url_p: string = '';
    clclave1: string = '';
    clclave2: string = '';
    clclave3: string = '';
    clclave4: string = '';


    test: string = '';

    registros: boolean = false;

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private service: DataService,
        public pipe: DecimalPipe,
    ) { }

    capOption1(name: string) {
        if (name === '0') this.opcion2 = [];
        else {
            this.clclave1 = name;
            this.url_p = 'https://api-padd.herokuapp.com/sagaji/' + name;
            this.service.url_select2 = this.url_p;

            this.service.getSelect2().subscribe(
                res => {
                    this.opcion2 = res;
                });
        }
    }


    capOption2(clclave: string) {
        if (clclave === '0') this.opcion3 = [];
        else {
            this.clclave2 = clclave;
            this.service.url_select3 = this.service.url_select2 + '/' + clclave;

            this.service.getSelect3().subscribe(
                res => {
                    this.opcion3 = res;
                });
        }
    }


    capOption3(clclave: string) {
        if (clclave === '0') this.opcion4 = [];
        else {
            this.clclave3 = clclave;
            this.service.url_select4 = this.service.url_select3 + '/' + clclave;


            this.service.getSelect4().subscribe(
                res => {
                    this.opcion4 = res;
                });
        }
    }


    capOption4(clclave: string) {
        this.clclave4 = clclave;
        if (this.clclave4 === '0') console.log('Nada que mostrar');
        else {
            this.service.url_busqueda = this.service.url_select4 + '/' + this.clclave4 + '/' + 0;


            this.service.getBusqueda().subscribe(
                res => {
                    if (res.registros !== 0) {
                        this.registros = true;
                        this.productos$ = res.productos;

                        if (res.totalpaginas > 1) {
                            for (let i = 1; i < res.totalpaginas; i++) {
                                this.service.url_busqueda = this.service.url_select4
                                    + '/' + this.clclave4 + '/' + i.toString();

                                this.service.getBusqueda().subscribe(
                                    res => {
                                        this.productos$ = this.productos$.concat(res.productos);
                                    },
                                );
                            }
                        }

                    } else this.registros = false;
                });
        }
    }


    getDescription() {
        if (this.clclave1 === 'ArmadoraModeloDescripcion') {
            for (const x of this.opcion4) {
                if (x.clclave === this.clclave4) return x.descripcion;
            }
        }
        if (this.clclave1 === 'LineaDescripcionModelo' || this.clclave1 === 'ModeloDescripcionPeriodo') {
            for (const x of this.opcion3) {
                if (x.clclave === this.clclave3) return x.descripcion;
            }
        }
        if (this.clclave1 === 'DescripcionModeloLinea') {
            for (const x of this.opcion2) {
                if (x.clclave === this.clclave2) return x.descripcion;
            }
        }
    }


    agregarProducto(pro) {
        this.addprod.nombre = pro.dsproducto;
        this.addprod.unidadmedida = 'pieza';
        this.addprod.tipo = this.getDescription();
        this.addprod.linea = pro.dslinea;
        this.addprod.categoria = pro.dscategoria;
        this.addprod.parte = pro.clproducto;
        this.addprod.precio = ((parseFloat(pro.preciocosto) / 0.80) * 1.16).toString();
        this.addprod.uni_9na = '5';
        this.addprod.uni_pan = '3';
        this.addprod.uni_sup = '7';
        this.service.postProduct(this.addprod).subscribe(
            res => { console.log(res); },
        );
    }

    open(content, element, view) {

        if (view === false) {
            this.opciones = view;
            this.service.getAplicaciones(element.clproducto).subscribe(
                res => {
                    this.app = res;
                },
            );
        } else {
            this.opciones = view;
            this.service.getEquivalencias(element.clproducto).subscribe(
                res => {
                    this.equi = res;
                },
            );
        }
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    close() {
        this.modalService.dismissAll();
    }

}
