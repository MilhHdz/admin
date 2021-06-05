import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';

import { DataService } from 'app/services/data.service';
import {
    Country,
    ALTERNATIVE,
    COUNTRIES,
} from '../../../../@core/data/productos';
import { Equivalencia } from './../../../../@core/data/equivalencias';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'ngx-equivalences',
    templateUrl: './equivalences.component.html',
    styleUrls: ['./equivalences.component.scss'],
    providers: [DecimalPipe],
})
export class EquivalencesComponent {

    title: string = '';

    alternativa$: Observable<Country[]>;
    filter = new FormControl('');
    equivalencias: Equivalencia[];

    productos: Country[];
    alternativa: Country[];

    id: string = 'Prueba';

    createFormGroup() {
        return new FormGroup({
            ano_in: new FormControl('', Validators.required),
            ano_fi: new FormControl('', Validators.required),
        });
    }

    applicationForm: FormGroup;

    constructor(
        config: NgbModalConfig,
        public pipe: DecimalPipe,
        private modalService: NgbModal,
        public dataService: DataService,
        private iconLibraries: NbIconLibraries,
        private rutaActiva: ActivatedRoute,
    ) {
        this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });

        this.loadData();

        this.title = this.transformTitle(dataService.nombreProducto);

        this.applicationForm = this.createFormGroup();

        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */

        // this.equivalencias = this.dataService.equivalencias;
        this.dataService.getEquivalencias(this.dataService.parte).subscribe(
            res => {
                this.equivalencias = res;
            },
        );
        config.backdrop = 'static';
        config.keyboard = false;

        this.productos = COUNTRIES;
        this.alternativa = ALTERNATIVE;

        this.removeItem();

        this.rutaActiva.params.subscribe(
            (params: Params) => {
                this.id = params.id;
            },
        );
    }

    transformTitle(title: string) {
        title = title.toLowerCase();
        return title[0].toUpperCase() + title.slice(1);
    }

    loadData() {
        this.alternativa$ = this.filter.valueChanges.pipe(
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

            for (const item of this.alternativa) {
              if (item.id === id) {
                const i = this.alternativa.indexOf(item); // Permite saber cual es la posicion del elemento en el array
                this.alternativa.splice(i, 1); // Elimina el elemento elegido de la tabla alternativa
                this.loadData(); // Actualizar los datos
                break;
              }
            }

            Swal.fire({
              title: 'Buen trabajo',
              text: 'Se ha eliminado con exito',
              icon: 'success',
              allowEscapeKey: false,
              allowOutsideClick: false,
            });
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

    search(text: string, pipe: PipeTransform): Country[] {
        return this.alternativa.filter(country => {
            const term = text.toLowerCase();
            return country.nombre.toLowerCase().includes(term)
                || country.tipo.toLowerCase().includes(term)
                || country.linea.toLowerCase().includes(term)
                || country.categoria.toLowerCase().includes(term)
                || country.parte.toLowerCase().includes(term);
        });
    }

    // remove item selected from array
    removeItem() {
        for (const item of this.productos) {
            if (this.transformTitle(item.nombre) === this.title) {
                const i = this.productos.indexOf(item); // Permite saber cual es la posicion del elemento en el array
                this.productos.splice(i, 1); // Elimina el elemento elegido de la tabla productos
                break;
            }
        }
    }


    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    close() {
        this.modalService.dismissAll();
    }


    onResetForm() {
        this.applicationForm.reset();
    }


    onSeveForm() {
        if (this.applicationForm.valid) {
            this.onResetForm();
            this.close();
        } else {
            this.onResetForm();
        }
    }

    get ano_in() { return this.applicationForm.get('ano_in'); }
    get ano_fi() { return this.applicationForm.get('ano_fi'); }
}
