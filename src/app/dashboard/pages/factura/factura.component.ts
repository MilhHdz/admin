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
        this.facturas = [];
        this.service.getAllFactura().subscribe(
            res => {
                if (res.code === 200) {
                    this.facturas = res.result;

                    this.facturas$ = this.filter.valueChanges.pipe(
                        startWith(''),
                        map(text => this.search(text, this.pipe)),
                    );   
                }
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
            this.alertaInicial('Agregando una nueva factura');
            this.saveFactura.folio = this.facturaForm.value['folio_f'];
            this.service.postFactura(this.saveFactura).subscribe(
                res => {
                    if (res.code === 200) {
                        this.loadData();
                        this.facturaForm.reset();
                        this.alertaFinal('Buen trabajo', 'Se ha agregado una nueva factura', 'success');
                    }
                    else this.alertaFinal('Ocurrio un error', 'Intentalo de nuevo', 'error');
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
                this.alertaInicial('Eliminando');

                this.service.deleteFactura(id).subscribe(
                    res => {
                        if (res.code === 200) {
                            this.loadData();
                            this.alertaFinal('Buen trabajo', 'Se ha eliminado con exito', 'success');
                        }
                        else this.alertaFinal('Ocurrio un error', 'Intentalo de nuevo', 'error');
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

    get folio_f() { return this.facturaForm.get('folio_f'); }

}
