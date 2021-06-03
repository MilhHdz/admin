import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';

import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';

import { DataService } from 'app/services/data.service';
import {
    Country,
    ALTERNATIVE,
    COUNTRIES,
} from '../../../../../@core/data/productos';

@Component({
    selector: 'ngx-add-equivalences',
    templateUrl: './add-equivalences.component.html',
    styleUrls: ['./add-equivalences.component.scss'],
    providers: [DecimalPipe],
})
export class AddEquivalencesComponent {

    title: string = '';

    productos: Country[];
    alternativa: Country[];
    elementSelected: Country[];

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

        this.title = this.transformTitle(dataService.nombreProducto);

        this.applicationForm = this.createFormGroup();

        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;

        this.productos = COUNTRIES;
        this.alternativa = ALTERNATIVE;
        this.elementSelected = [];

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


    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    close() {
        this.modalService.dismissAll();
    }

    get ano_in() { return this.applicationForm.get('ano_in'); }
    get ano_fi() { return this.applicationForm.get('ano_fi'); }

    elementSelect(element: Country) {

        // Saber si esta el elemento en el array
        if (this.elementSelected.includes(element)) {
            const i = this.elementSelected.indexOf(element);
            this.elementSelected.splice(i, 1);
        } else {
            this.elementSelected.push(element);
        }
    }

    saveEquivalences() {
        console.log(this.elementSelected);
    }
}
