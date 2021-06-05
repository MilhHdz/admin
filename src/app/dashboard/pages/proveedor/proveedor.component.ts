import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';
import Swal from 'sweetalert2';

import { Proveedor } from '../../../@core/data/Proveedores';
import { DataService } from 'app/services/data.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'ngx-proveedor',
    templateUrl: './proveedor.component.html',
    styleUrls: ['./proveedor.component.scss'],
    providers: [DecimalPipe],
})
export class ProveedorComponent {

    proveedores: Proveedor[];
    saveProveedor: Proveedor = { 'nombre': '' };
    proveedores$: Observable<Proveedor[]>;

    filter = new FormControl('');

    createFormGroup() {
        return new FormGroup({
            nombre_f: new FormControl('', Validators.required),
        });
    }

    proveedorForm: FormGroup;

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

        this.proveedorForm = this.createFormGroup();

        this.loadData();
    }

    // ***** Parte logica *****
    loadData() {
        this.service.getAllProveedor().subscribe(
            res => {
                this.proveedores = res;

                this.proveedores$ = this.filter.valueChanges.pipe(
                    startWith(''),
                    map(text => this.search(text, this.pipe)),
                );
            },
        );
    }

    search(text: string, pipe: PipeTransform): Proveedor[] {
        return this.proveedores.filter(proveedor => {
            const term = text.toLowerCase();
            return proveedor.nombre.toLowerCase().includes(term);
        });
    }

    saveNewProveedor() {
        if (this.proveedorForm.valid) {
            this.saveProveedor.nombre = this.proveedorForm.value['nombre_f'];
            this.service.postProveedor(this.saveProveedor).subscribe(
                res => {
                    this.loadData();
                    this.proveedorForm.reset();
                },
            );
        }
    }

    deleteProveedor(id) {

        Swal.fire({
            title: 'Está seguro de eliminar?',
            text: 'Esta acción no se podra revertir...',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar',
            allowEscapeKey: false,
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                this.SeewLoading('Eliminando');

                this.service.deleteProveedor(id).subscribe(
                    res => {
                        this.loadData();
                        Swal.fire({
                            title: 'Buen trabajo',
                            text: 'Se ha eliminado con exito ',
                            icon: 'success',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                        });
                    },
                );
            }
        });
    }

    // ***** Parte Interfas *****
    SeewLoading(titulo) {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: titulo,
            text: 'Espere un momento por favor...',
        });
        Swal.showLoading();
    }


    get nombre_f() { return this.proveedorForm.get('nombre_f'); }

}
