import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';
import Swal from 'sweetalert2';

import { Cliente, CLIENTES } from '../../../@core/data/clientes';
import { DataService } from 'app/services/data.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'ngx-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss'],
    providers: [DecimalPipe],
})
export class ClientesComponent {

    clientes: Cliente[];
    optionModal: boolean = false;
    saveCliente: Cliente = { 'nombre': '', 'ape_pat': '', 'ape_mat': '', 'telefono': '', 'correo': '' };

    clientes$: Observable<Cliente[]>;
    filter = new FormControl('');

    createFormGroup() {
        return new FormGroup({
            nombre_f: new FormControl('', Validators.required),
            ape_pat_f: new FormControl('', Validators.required),
            ape_mat_f: new FormControl('', Validators.required),
            telefono: new FormControl('', Validators.required),
            // automovil: new FormControl('', Validators.required),
            // modelo: new FormControl('', Validators.required),
            // ano: new FormControl('', Validators.required),
            correo_electronico: new FormControl('', Validators.required),
            // calle: new FormControl('', Validators.required),
            // numero: new FormControl('', Validators.required),
            // ciudad: new FormControl('', Validators.required),
            // codigo_Postal: new FormControl('', Validators.required),
            // rfc: new FormControl('', Validators.required),
            // razon_social: new FormControl('', Validators.required),
        });
    }

    clienteForm: FormGroup;

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        public pipe: DecimalPipe,
        private iconLibraries: NbIconLibraries,
        private service: DataService,
    ) {
        this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });

        this.clientes = CLIENTES;

        this.loadData();

        this.clienteForm = this.createFormGroup();

        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;
    }


    loadData() {
        this.service.getAllCliente().subscribe(
            res => {
                this.clientes = res;
                console.log(this.clientes);

                this.clientes$ = this.filter.valueChanges.pipe(
                    startWith(''),
                    map(text => this.search(text, this.pipe)),
                );
            }
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

                for (const item of this.clientes) {
                    if (item.id === id) {
                        const i = this.clientes.indexOf(item); // Permite saber cual es la posicion del elemento en el array
                        this.clientes.splice(i, 1); // Elimina el elemento elegido de la tabla clientes
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


    search(text: string, pipe: PipeTransform): Cliente[] {
        return this.clientes.filter(cliente => {
            const term = text.toLowerCase();
            return cliente.nombre.toLowerCase().includes(term)
                || cliente.ape_pat.toLowerCase().includes(term)
                || cliente.ape_mat.toLowerCase().includes(term);
        });
    }

    open(content, option, cliente: Cliente) {
        this.optionModal = option;
        this.modalService.open(content, { scrollable: true });

        if (option === false) {
            this.nombre_f.setValue(cliente.nombre);
            this.ape_pat_f.setValue(cliente.ape_pat);
            this.ape_mat_f.setValue(cliente.ape_mat);
            this.telefono.setValue(cliente.telefono);
            // this.automovil.setValue(cliente.automovil);
            // this.modelo.setValue(cliente.modelo);
            // this.ano.setValue(cliente.ano);
            this.correo_electronico.setValue(cliente.correo);
            // this.calle.setValue(cliente.calle);
            // this.numero.setValue(cliente.numero);
            // this.ciudad.setValue(cliente.ciudad);
            // this.codigo_Postal.setValue(cliente.codigo_Postal);
            // this.rfc.setValue(cliente.rfc);
            // this.razon_social.setValue(cliente.razon_social);
        }
    }

    close() {
        this.onResetForm();
        this.modalService.dismissAll();
    }

    onResetForm() {
        this.clienteForm.reset();
    }

    dataValue() {
        this.saveCliente.nombre = this.clienteForm.value['nombre_f'];
        this.saveCliente.ape_pat = this.clienteForm.value['ape_pat_f'];
        this.saveCliente.ape_mat = this.clienteForm.value['ape_mat_f'];
        this.saveCliente.telefono = this.clienteForm.value['telefono'];
        this.saveCliente.correo = this.clienteForm.value['correo_electronico'];
    }

    onSeveForm() {
        if (this.clienteForm.valid) {
            // console.log('saved ', this.clienteForm.value);
            if (this.optionModal) {
                this.dataValue();
                this.service.postCliente(this.saveCliente).subscribe(
                    res => {
                        console.log(res);
                        this.loadData();
                    }
                );
            }
            this.onResetForm();
            this.close();
        } else {
            this.onResetForm();
        }
    }

    // Valores del formulario
    get nombre_f() { return this.clienteForm.get('nombre_f'); }
    get ape_pat_f() { return this.clienteForm.get('ape_pat_f'); }
    get ape_mat_f() { return this.clienteForm.get('ape_mat_f'); }
    get telefono() { return this.clienteForm.get('telefono'); }
    get automovil() { return this.clienteForm.get('automovil'); }
    get modelo() { return this.clienteForm.get('modelo'); }
    get ano() { return this.clienteForm.get('ano'); }
    get correo_electronico() { return this.clienteForm.get('correo_electronico'); }
    get calle() { return this.clienteForm.get('calle'); }
    get numero() { return this.clienteForm.get('numero'); }
    get ciudad() { return this.clienteForm.get('ciudad'); }
    get codigo_Postal() { return this.clienteForm.get('codigo_Postal'); }
    get rfc() { return this.clienteForm.get('rfc'); }
    get razon_social() { return this.clienteForm.get('razon_social'); }

}
