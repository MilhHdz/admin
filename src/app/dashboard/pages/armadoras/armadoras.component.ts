import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';
import Swal from 'sweetalert2';

import { Armadora, ARMADORAS } from '../../../@core/data/armadoras';
import { DataService } from 'app/services/data.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'ngx-armadoras',
    templateUrl: './armadoras.component.html',
    styleUrls: ['./armadoras.component.scss'],
    providers: [DecimalPipe],
})
export class ArmadorasComponent {

    armadoras: any;
    saveArmadora: Armadora = {'nombre':''};
    optionModal: boolean = false;

    armadoras$: Observable<Armadora[]>;
    filter = new FormControl('');

    createFormGroup() {
        return new FormGroup({
            nombre_f: new FormControl('', Validators.required),
        });
    }

    armadoraForm: FormGroup;

    constructor(
        config: NgbModalConfig,
        public modalService: NgbModal,
        public pipe: DecimalPipe,
        private iconLibraries: NbIconLibraries,
        private service: DataService,
    ) {
        this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });



        // this.armadoras = ARMADORAS;

        this.loadData();

        this.armadoraForm = this.createFormGroup();

        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;
    }


    loadData() {

        this.service.getAllArmadora().subscribe(
            res => {
                this.armadoras = res;

                this.armadoras$ = this.filter.valueChanges.pipe(
                    startWith(''),
                    map(text => this.search(text, this.pipe)),
                );
            }
        );
    }


    search(text: string, pipe: PipeTransform): Armadora[] {
        return this.armadoras.filter(linea => {
            const term = text.toLowerCase();
            return linea.nombre.toLowerCase().includes(term);
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

                for (const item of this.armadoras) {
                    if (item.id === id) {
                        const i = this.armadoras.indexOf(item);
                        this.armadoras.splice(i, 1);
                        break;
                    }
                }

                this.service.deleteArmadora(id).subscribe(
                    res => {
                        console.log(res);
                        this.loadData();
                        Swal.fire({
                            title: 'Buen trabajo',
                            text: 'Se ha eliminado con exito',
                            icon: 'success',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                        });
                    }
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


    open(content, option, nombre) {
        this.optionModal = option;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

        if (option === false) {
            this.nombre_f.setValue(nombre);
        }
    }

    close() {
        this.modalService.dismissAll();
    }

    onResetForm() {
        this.armadoraForm.reset();
    }

    onSeveForm() {
        if (this.armadoraForm.valid) {
            console.log('saved ', this.armadoraForm.value);
            this.saveArmadora.nombre = this.armadoraForm.value['nombre_f'];
            this.service.postArmadora(this.saveArmadora).subscribe(
                res => {
                    // this.armadoras.push(this)
                    console.log(res);
                    this.loadData();
                }
            );
            this.onResetForm();
            this.close();
        } else {
            this.onResetForm();
        }
    }

    // Valores de los campos del formulario
    get nombre_f() { return this.armadoraForm.get('nombre_f'); }

}
