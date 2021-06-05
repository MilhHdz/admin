import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';
import Swal from 'sweetalert2';

import { Factura } from '../../../@core/data/Facturas';
import { DataService } from 'app/services/data.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'ngx-factura',
    templateUrl: './factura.component.html',
    styleUrls: ['./factura.component.scss'],
    providers: [DecimalPipe],
})
export class FacturaComponent {

    facturas: Factura[];
    saveFactura: Factura = { 'folio': '' };
    facturas$: Observable<Factura[]>;

    filter = new FormControl('');

    createFormGroup() {
        return new FormGroup({
            folio_f: new FormControl('', Validators.required),
        });
    }

    facturaForm: FormGroup;

    constructor(
        config: NgbModalConfig,
        public pipe: DecimalPipe,
        private iconLibraries: NbIconLibraries,
        private service: DataService,
    ) {
        this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });

        this.facturaForm = this.createFormGroup();

        this.loadData();
    }

    // ***** Parte logica *****
    loadData() {
        this.service.getAllFactura().subscribe(
            res => {
                this.facturas = res;

                this.facturas$ = this.filter.valueChanges.pipe(
                    startWith(''),
                    map(text => this.search(text, this.pipe)),
                );
            }
        );
    }

    search(text: string, pipe: PipeTransform): Factura[] {
        return this.facturas.filter(factura => {
            const term = text.toLowerCase();
            return factura.folio.toLowerCase().includes(term);
        });
    }

    saveNewFactura() {
        if (this.facturaForm.valid) {
            this.saveFactura.folio = this.facturaForm.value['folio_f'];
            this.service.postFactura(this.saveFactura).subscribe(
                res => {
                    this.loadData();
                    this.facturaForm.reset();
                }
            );
        }
    }

    deleteFactura(id) {

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

                this.service.deleteFactura(id).subscribe(
                    res => {
                        this.loadData();
                        Swal.fire({
                            title: 'Buen trabajo',
                            text: 'Se ha eliminado con exito ',
                            icon: 'success',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                        });
                    }
                );
            }
        });
    }


    // ***** Parte logica *****
    SeewLoading(titulo) {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: titulo,
            text: 'Espere un momento por favor...',
        });
        Swal.showLoading();
    }

    get folio_f() { return this.facturaForm.get('folio_f'); }

}
