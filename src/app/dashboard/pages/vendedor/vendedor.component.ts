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
    createFormGroup() {
        return new FormGroup({
            nombre_f: new FormControl('', Validators.required),
            ape_pat_f: new FormControl('', Validators.required),
            ape_mat_f: new FormControl('', Validators.required),
            telefono: new FormControl('', Validators.required),
            correo_electronico: new FormControl('', Validators.required),
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
       this.service.getAllVendedor().subscribe(
           res => {
               this.vendedores = res;

               this.vendedores$ = this.filter.valueChanges.pipe(
                   startWith(''),
                   map(text => this.search(text, this.pipe)),
               );
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

                this.service.deleteVendedor(id).subscribe(
                    res => {
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
    get telefono() { return this.vendedorForm.get('telefono'); }
    get correo_electronico() { return this.vendedorForm.get('correo_electronico'); }

}
