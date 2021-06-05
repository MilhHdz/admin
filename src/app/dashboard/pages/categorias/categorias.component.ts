import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';
import Swal from 'sweetalert2';

import { Categoria } from '../../../@core/data/categorias';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';

import { DataService } from 'app/services/data.service';

@Component({
    selector: 'ngx-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.scss'],
    providers: [DecimalPipe],
})
export class CategoriasComponent {

    categorias: Categoria[];
    optionModal: boolean = false;

    categorias$: Observable<Categoria[]>;
    filter = new FormControl('');

    saveCategory: Categoria = {'clave': '000000', 'nombre': ''};

    createFormGroup() {
        return new FormGroup({
            name: new FormControl('', Validators.required),
        });
    }

    categoriaForm: FormGroup;

    constructor(
        config: NgbModalConfig,
        public modalService: NgbModal,
        public pipe: DecimalPipe,
        private dataService: DataService,
        private iconLibraries: NbIconLibraries,
    ) {
        this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });

        this.loadData();

        this.categorias = this.dataService.CATEGORIAS;

        this.categoriaForm = this.createFormGroup();

        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;
    }


    loadData() {
        this.dataService.getAllCategories().subscribe(
            res => {
                this.dataService.CATEGORIAS = res;
            },
        );


        this.categorias$ = this.filter.valueChanges.pipe(
            startWith(''),
            map(text => this.search(text, this.pipe)),
        );
    }


    onRemoveItem(id) {
        Swal.fire({
            title: '¿Está seguro de eliminar?',
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

                for (const item of this.categorias) {
                    if (item.id === id) {
                        // Permite saber cual es la posicion del elemento en el array
                        const i = this.categorias.indexOf(item);
                        this.categorias.splice(i, 1); // Elimina el elemento elegido de la tabla categorias
                        this.loadData(); // Actualizar los datos
                        break;
                    }
                }

                this.dataService.deleteCategory(id).subscribe(
                    res => {
                        Swal.fire({
                            title: 'Buen trabajo',
                            text: 'Se ha eliminado con exito',
                            icon: 'success',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                        });
                    },
                );

            }
        });
    }


    SeewLoading(titulo) {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: titulo,
            text: 'Espere un momento por favor...',
        });
        Swal.showLoading();
    }


    search(text: string, pipe: PipeTransform): Categoria[] {
        return this.categorias.filter(categoria => {
            const term = text.toLowerCase();
            return categoria.nombre.toLowerCase().includes(term);
        });
    }

    open(content, option, name) {
        this.optionModal = option;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

        if (option === false) {
            this.name.setValue(name);
        }
    }

    close() {
        this.modalService.dismissAll();
    }

    onResetForm() {
        this.categoriaForm.reset();
    }

    onSeveForm() {
        if (this.categoriaForm.valid) {
            // console.log('saved ', this.categoriaForm.value);
            this.saveCategory.nombre = this.categoriaForm.value['name'];
            this.dataService.postCategry(this.saveCategory).subscribe(
                res => {
                    this.categorias.push(this.saveCategory);
                    this.loadData();
                    console.log(res);
                },
            );
            this.onResetForm();
            this.close();
        } else {
            this.onResetForm();
        }
    }

    // Valores de los campos del formulario
    get name() { return this.categoriaForm.get('name'); }

}
