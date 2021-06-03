import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbIconLibraries } from '@nebular/theme';
import Swal from 'sweetalert2';

import { Linea, LINEAS } from '../../../@core/data/lineas';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { DataService } from 'app/services/data.service';
import { select2, select3, select4 } from '../../../@core/data/sagaji';

@Component({
    selector: 'ngx-lineas',
    templateUrl: './lineas.component.html',
    styleUrls: ['./lineas.component.scss'],
    providers: [DecimalPipe],
})
export class LineasComponent {

    lineas: any;
    optionModal: boolean = false;

    lineas$: Observable<Linea[]>;
    filter = new FormControl('');
    saveLinea: Linea = {'nombre':''};

    //Sagaji
    opcion1: string[] = ["ArmadoraModeloDescripcion", "LineaDescripcionModelo", "DescripcionModeloLinea", "ModeloDescripcionPeriodo"];
    opcion2: select2[];
    opcion3: select3[];
    opcion4: select4[];

    // Descripcion
    dsproducto: string = '';
    dslinea: string = '';
    clproducto: string = '';
    unimedida: string = '';
    dscategoria: string = '';

    url_p: string = '';
    clclave1: string = '';
    clclave2: string = '';
    clclave3: string = '';
    clclave4: string = '';

    createFormGroup() {
        return new FormGroup({
            nombre_f: new FormControl('', Validators.required),
        });
    }

    lineaForm: FormGroup;

    constructor(
        config: NgbModalConfig,
        public modalService: NgbModal,
        public pipe: DecimalPipe,
        private iconLibraries: NbIconLibraries,
        private service: DataService,
    ) {
        this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });

        // this.lineas = LINEAS;

        this.loadData();

        this.lineas = this.service.Lineas;

        this.lineaForm = this.createFormGroup();

        // this.capOption1('LineaDescripcionModelo');

        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;
    }


    loadData() {
        this.service.getAllLine().subscribe(
            res => {
                this.service.Lineas = res;
            }
        );

        this.lineas$ = this.filter.valueChanges.pipe(
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

                for (const item of this.lineas) {
                    if (item.id === id) {
                        const i = this.lineas.indexOf(item); // Permite saber cual es la posicion del elemento en el array
                        this.lineas.splice(i, 1); // Elimina el elemento elegido de la tabla lineas
                        this.loadData(); // Actualizar los datos
                        break;
                    }
                }

                this.service.deleteLine(id).subscribe(
                    res => {
                        console.log(res);
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


    search(text: string, pipe: PipeTransform): Linea[] {
        return this.lineas.filter(linea => {
            const term = text.toLowerCase();
            return linea.nombre.toLowerCase().includes(term);
        });
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
        this.lineaForm.reset();
    }

    onSeveForm() {
        if (this.lineaForm.valid) {
            this.saveLinea.nombre = this.lineaForm.value['nombre_f'];
            this.service.postLine(this.saveLinea).subscribe(
                res => {
                    this.lineas.push(this.saveLinea);
                    this.loadData();
                    console.log(res);
                }
            );
            // console.log('saved ', this.lineaForm.value);
            this.onResetForm();
            this.close();
        } else {
            this.onResetForm();
        }
    }

    /*
      capOption1(name: string) {
        if (name === '0') this.opcion2 = [];
        else {
          this.clclave1 = name;
          this.url_p = '/MVC?id=CategoriaProductos&tipo=' + name;
          this.service.url_select2 = this.url_p;
    
          this.service.getSelect2().subscribe(
            res => {
              this.opcion2 = res;
              console.log(res);
            });
        }
      }
    
    
      capOption2(clclave: string) {
        if (clclave === '0') this.opcion3 = [];
        else {
          this.clclave2 = clclave;
          this.service.url_select3 = this.service.url_select2 + "&primera=" + clclave
    
          this.service.getSelect3().subscribe(
            res => {
              this.opcion3 = res;
            });
        }
      }
    
    
      capOption3(clclave: string) {
        if (clclave === '0') this.opcion4 = [];
        else {
          this.clclave3 = clclave;
          this.service.url_select4 = this.service.url_select3 + "&segunda=" + clclave
    
    
          this.service.getSelect4().subscribe(
            res => {
              this.opcion4 = res;
            });
        }
      }
    
      capOption4(clclave: string) {
        if (clclave === '0') console.log('Nada que mostrar');
        else {
          this.service.url_busqueda = "MVC?id=BusquedaProductosCategoria&tipo=" + this.clclave1
            + "&primera=" + this.clclave2 + "&segunda=" + this.clclave3 + "&tercera="
            + clclave + "&cuarta=&pagina=0";
    
    
          this.service.getBusqueda().subscribe(
            res => {
              console.log(res.productos);
              this.dsproducto = res.productos[0].dsproducto;
              this.dslinea = res.productos[0].dslinea;
              this.clproducto = res.productos[0].clproducto;
              this.unimedida = res.productos[0].unidadmedida;
              this.dscategoria = res.productos[0].dscategoria;
              console.log(this.dsproducto);
            });
        }
      }
    */
    // Valores de los campos del formulario
    get nombre_f() { return this.lineaForm.get('nombre_f'); }

}
