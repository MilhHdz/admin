import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NbIconLibraries } from '@nebular/theme';

import { PRODUCTO } from '../../../@core/data/productos';
import { DataService } from 'app/services/data.service';

@Component({
    selector: 'ngx-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss'],
    providers: [DecimalPipe],
})
export class ProductosComponent {
    productos_a_mostrar: Observable<PRODUCTO[]>;
    producto_en_almacen: PRODUCTO[];
    producto_terminado: PRODUCTO[];

    filter = new FormControl('');
    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        public pipe: DecimalPipe,
        private iconLibraries: NbIconLibraries,
        private service: DataService,
    ) {
        this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });

        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;

        this.obtenerProductos();
    }

    obtenerProductos() {
        this.service.getAllProducts().subscribe(
            res => {
                this.producto_en_almacen = [];
                if (res.code === 200) {
                    for (var item of res.result) {
                        if (item.cantidad !== "0")
                            this.producto_en_almacen.push(item);
                        else this.producto_terminado.push(item);
                    }
                    this.productos_a_mostrar = this.filter.valueChanges.pipe(
                        startWith(''),
                        map(text => this.search(text, this.pipe)),
                    );
                }
            }
        );
    }

    search(text: string, pipe: PipeTransform): PRODUCTO[] {
        return this.producto_en_almacen.filter(producto => {
            const term = text.toLowerCase();
            return producto.nombre.toLowerCase().includes(term)
                || producto.tipo_de_producto.toLowerCase().includes(term)
                || producto.linea.toLowerCase().includes(term)
                || producto.categoria.toLowerCase().includes(term)
                || producto.parte.toLowerCase().includes(term);
        });
    }

}