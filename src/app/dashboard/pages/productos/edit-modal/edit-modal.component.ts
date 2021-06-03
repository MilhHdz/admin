import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'app/services/data.service';

@Component({
    selector: 'ngx-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalProductosComponent {

    createFormGroup() {
        return new FormGroup({
            nombre_f: new FormControl('', Validators.required),
            parte_f: new FormControl('', Validators.required),
            uni_9na_f: new FormControl('', Validators.required),
            uni_pan_f: new FormControl('', Validators.required),
            uni_sup_f: new FormControl('', Validators.required),
            precio_f: new FormControl('', Validators.required),
        });
    }

    productForm: FormGroup;

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private dataService: DataService,
    ) {
        this.productForm = this.createFormGroup();
        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;
    }


    close() {
        this.modalService.dismissAll();
    }

    onResetForm() {
        this.productForm.reset();
    }

    onSeveForm() {
        if (this.productForm.valid) {
            // console.log('saved ', this.productForm.value);
            this.onResetForm();
            this.close();
        } else {
            this.onResetForm();
        }
    }


    // Valores de los campos del formulario
    get nombre_f() { return this.productForm.get('nombre_f'); }
    get parte_f() { return this.productForm.get('parte_f'); }
    get uni_9na_f() { return this.productForm.get('uni_9na_f'); }
    get uni_pan_f() { return this.productForm.get('uni_pan_f'); }
    get uni_sup_f() { return this.productForm.get('uni_sup_f'); }
    get precio_f() { return this.productForm.get('precio_f'); }
}
