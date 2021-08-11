import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';
import { startWith, map } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Vendedor } from 'app/@core/data/vendedor';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'ngx-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.scss'],
  providers: [DecimalPipe],
})
export class VendedorComponent {

    vendedores: Vendedor[];
    vendedores$: Observable<Vendedor[]>;

    personal: Vendedor = {
        'nombre': '',
        'ape_pat': '',
        'ape_mat': '',
        'telefono': '',
        'correo': '',
        'contraseña': '',
        'id_sucursal': ''
    }
    createFormGroup() {
        return new FormGroup({
            nombre_f: new FormControl('', Validators.required),
            ape_pat_f: new FormControl('', Validators.required),
            ape_mat_f: new FormControl('', Validators.required),
            telefono_f: new FormControl('', Validators.required),
            correo_electronico_f: new FormControl('', Validators.required),
            contrasena_f: new FormControl('', Validators.required),
        });
    }
    vendedorForm: FormGroup;

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

        this.vendedorForm = this.createFormGroup();
        this.loadData();
   }


   loadData() {
       this.vendedores = [];
       this.service.getAllVendedor().subscribe(
           res => {
                if (res.code === 200) {
                    this.vendedores = res.result;
                    this.vendedores$ = this.filter.valueChanges.pipe(
                        startWith(''),
                        map(text => this.search(text, this.pipe)),
                    );
                }
           }
       );
   }


   search(text: string, pipe: PipeTransform): Vendedor[] {
       return this.vendedores.filter(vendedor => {
           const term = text.toLowerCase();
           return vendedor.nombre.toLowerCase().includes(term)
           || vendedor.ape_pat.toLowerCase().includes(term)
           || vendedor.ape_mat.toLowerCase().includes(term);
       });
   }

    dataValue() {
        this.personal.nombre = this.vendedorForm.value['nombre_f'];
        this.personal.ape_pat = this.vendedorForm.value['ape_pat_f'];
        this.personal.ape_mat = this.vendedorForm.value['ape_mat_f'];
        this.personal.telefono = this.vendedorForm.value['telefono_f'];
        this.personal.correo = this.vendedorForm.value['correo_electronico_f'];
        this.personal.contraseña = this.vendedorForm.value['contrasena_f'];
        this.personal.id_sucursal = this.service.sucursal;
    }

    agregarPersonal() {
        if (this.vendedorForm.valid) {
            this.alertaInicial('Agregando un nuevo personal');

            this.dataValue();
            this.service.postVendedor(this.personal).subscribe(
                res => {
                    if (res.code === 200) {
                        this.loadData();
                        this.alertaFinal('Buen trabajo', 'Se ha agregado un nuevo personal', 'success');
                    }
                    else this.alertaFinal('Ocurrio un error', 'Intentalo de nuevo', 'error');
                }
            );
        }
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

                this.alertaInicial('Eliminando');

                this.service.deleteVendedor(id).subscribe(
                    res => {
                        this.loadData();

                        this.alertaFinal('Buen trabajo', 'Se ha eliminado con exito', 'success');
                        // else this.alertaFinal('Ocurrio un error', 'Intentalo de nuevo', 'error');
                    }
                );
            }
        });
   }


    // ***** ALERTS *****
    alertaInicial(titulo) {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: titulo,
            text: 'Espere un momento por favor...',
        });
        Swal.showLoading();
    }

    alertaFinal(title, text, icon) {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            allowEscapeKey: false,
            allowOutsideClick: false,
        });
    }

    open(content) {
        this.modalService.open(content, { scrollable: true });
    }

    close() {
        this.vendedorForm.reset();
        this.modalService.dismissAll();
    }

    get nombre_f() { return this.vendedorForm.get('nombre_f'); }
    get ape_pat_f() { return this.vendedorForm.get('ape_pat_f'); }
    get ape_mat_f() { return this.vendedorForm.get('ape_mat_f'); }
    get telefono_f() { return this.vendedorForm.get('telefono_f'); }
    get correo_electronico_f() { return this.vendedorForm.get('correo_electronico_f'); }
    get contrasena_f() { return this.vendedorForm.get('contrasena_f'); }

}
