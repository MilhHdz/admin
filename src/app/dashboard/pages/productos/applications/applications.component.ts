import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from 'app/services/data.service';
import {
    Aplication,
    CILINDROS,
    MOTORES,
    SELECTS,
    Armadora,
    Modelo,
    Version,
    AÑOS,
} from '../../../../@core/data/productos';

import { Aplicacion } from './../../../../@core/data/aplicaciones';

@Component({
    selector: 'ngx-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss'],
    providers: [DecimalPipe],
})
export class AplicationsComponent {

    applications$: Observable<Aplication[]>;
    filter = new FormControl('');

    selectors: Armadora[];
    modelos: Modelo[];
    versiones: Version[];
    cilindros = CILINDROS;
    motores = MOTORES;
    anos = AÑOS;

    aplicaciones: Aplicacion[];

    title: string = '';

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
    ) {
        this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });

        this.selectors = SELECTS;
        this.loadData();

        this.title = this.transformTitle(dataService.nombreProducto);
        this.dataService.getAplicaciones(dataService.parte).subscribe(
            res => {
                this.aplicaciones = res;
            },
        );

        this.applicationForm = this.createFormGroup();

        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;
    }

    transformTitle(title: string) {
        title = title.toLowerCase();
        return title[0].toUpperCase() + title.slice(1);
    }

    loadData() {
        this.applications$ = this.filter.valueChanges.pipe(
            startWith(''),
            map(text => this.search(text, this.pipe)),
        );
    }


    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    close() {
        this.modalService.dismissAll();
    }

    onSelectModel(id: number) {
        this.modelos = this.selectors[id - 1].modelo;
        this.versiones = null;
    }

    onSelectVersion(id: number) {
        this.versiones = this.modelos[id - 1].version;
    }


    search(text: string, pipe: PipeTransform): Aplication[] {
        return this.dataService.test.filter(aplication => {
            const term = text.toLowerCase();
            return aplication.armadora.toLowerCase().includes(term)
                || aplication.modelo.toLowerCase().includes(term)
                || aplication.version.toLowerCase().includes(term)
                || aplication.cilindros.toLowerCase().includes(term)
                || aplication.motor.toLowerCase().includes(term)
                || aplication.ano_inicial.toLowerCase().includes(term)
                || aplication.ano_final.toLowerCase().includes(term);
        });
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

            for (const item of this.dataService.test) {
              if (item.id === id) {
                const i = this.dataService.test.indexOf(item);
                this.dataService.test.splice(i, 1);
                this.loadData();
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


    onResetForm() {
        this.applicationForm.reset();
    }


    onSeveForm() {
        if (this.applicationForm.valid) {
            // console.log('saved ', this.applicationForm.value);
            this.onResetForm();
            this.close();
        } else {
            this.onResetForm();
        }
    }

    get ano_in() { return this.applicationForm.get('ano_in'); }
    get ano_fi() { return this.applicationForm.get('ano_fi'); }
}
