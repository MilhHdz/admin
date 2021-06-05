import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {
    COUNTRIES,
    Country,
    PARTES,
    CATEGORIAS,
    LIENAS,
    ProdPAD,
    AddPAD,
} from '../../../@core/data/productos';
import { tipoProducto } from '../../../@core/data/tipo-de-producto';
import { Armadora } from '../../../@core/data/armadoras';
import { DataService } from 'app/services/data.service';
import { NbIconLibraries } from '@nebular/theme';

@Component({
    selector: 'ngx-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss'],
    providers: [DecimalPipe],
})
export class ProductosComponent {

    countries$: Observable<Country[]>;
    con$: ProdPAD[];
    filter = new FormControl('');

    producto: Country;
    productos = COUNTRIES;

    tipoPro: tipoProducto[];
    modelo: tipoProducto[];
    armadora: Armadora[];
    linea: Armadora[];
    categoria: Armadora[];

    AddProduct: AddPAD = {
        'nombre': '', 'unidadmedida': '', 'tipo': '',
        'linea': '', 'categoria': '', 'parte': '',
        'precio': '', 'uni_9na': '', 'uni_pan': '', 'uni_sup': '',
    };

    nombre: string;

    test: string[] = ['Pieza', 'Litro'];

    partes = PARTES;
    categorias = CATEGORIAS;
    lienas = LIENAS;
    optionModal: boolean = false;

    createFormGroup() {
        return new FormGroup({
            uni_med: new FormControl(''),
            tipo_f: new FormControl(''),
            linea_f: new FormControl(''),
            cate_f: new FormControl(''),
            parte_f: new FormControl(''),
            nombre_f: new FormControl('', Validators.required),
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
        public pipe: DecimalPipe,
        private dataService: DataService,
        private iconLibraries: NbIconLibraries,
    ) {
        this.iconLibraries.registerFontPack('fas', { packClass: 'fas', iconClassPrefix: 'fa' });

        this.loadData();

        this.productForm = this.createFormGroup();

        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;
    }

    loadData() {
        this.cargarArmadoras();
        this.cargarCategorias();
        this.cargarLineas();

        this.countries$ = this.filter.valueChanges.pipe(
            startWith(''),
            map(text => this.search(text, this.pipe)),
        );

        this.dataService.getAllProducts().subscribe(
            res => {
                this.con$ = res;
            },
        );
    }

    cargarTipoProd(clclave) {
        this.dataService.url_select4 = this.dataService.url_select3 + '/' + clclave;
        this.dataService.getSelect4().subscribe(
            res => { this.tipoPro = res; },
        );
    }

    cargarArmadoras() {
        this.dataService.url_select2 = 'https://api-padd.herokuapp.com/sagaji/ArmadoraModeloDescripcion';
        this.dataService.getSelect2().subscribe(
            res => {
                this.armadora = res;
                this.modelo = [];
                this.tipoPro = [];
            },
        );
    }

    cargarModelos(clclave) {
        this.dataService.url_select3 = this.dataService.url_select2 + '/' + clclave;
        this.dataService.getSelect3().subscribe(
            res => {
                this.modelo = res;
                this.tipoPro = [];
            },
        );
    }

    cargarCategorias() {
        this.dataService.getAllCategories().subscribe(
            res => {
                this.categoria = res;
                this.dataService.CATEGORIAS = res;
            },
        );
    }

    cargarLineas() {
        this.dataService.getAllLine().subscribe(
            res => {
                this.linea = res;
                this.dataService.Lineas = res;
            },
        );
    }

    search(text: string, pipe: PipeTransform): Country[] {
        return this.productos.filter(country => {
            const term = text.toLowerCase();
            return country.nombre.toLowerCase().includes(term)
                || country.tipo.toLowerCase().includes(term)
                || country.linea.toLowerCase().includes(term)
                || country.categoria.toLowerCase().includes(term)
                || country.parte.toLowerCase().includes(term)
                || country.precio.toLowerCase().includes(term);
        });
    }

    onSelect(element) {
        this.dataService.nombreProducto = element.nombre;
        this.dataService.parte = element.parte;
    }

    onSelectEquivalences(element) {
        this.dataService.nombreProducto = element.nombre;
        this.dataService.parte = element.parte;
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

                for (const item of this.con$) {
                    if (item.id === id) {
                        const i = this.con$.indexOf(item);
                        this.con$.splice(i, 1);
                        break;
                    }
                }

                this.dataService.deleteProduct(id).subscribe(
                    res => {
                        console.log(res);
                    });

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


    // **** FUNCIONES AL FORMULARIO ****
    open(content, option, producto: Country) {
        this.optionModal = option;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

        if (option === false) {
            this.nombre_f.setValue(producto.nombre);
            this.parte_f.setValue(producto.parte);
            this.uni_9na_f.setValue(producto.uni_9na);
            this.uni_pan_f.setValue(producto.uni_pan);
            this.uni_sup_f.setValue(producto.uni_sup);
            this.precio_f.setValue(producto.precio);
        }
    }


    openModalEdit(edit) {
        this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title' });
    }


    close() {
        this.modalService.dismissAll();
    }


    onResetForm() {
        this.productForm.reset();
    }


    onSeveForm() {
        if (this.productForm.valid) {
            if (this.optionModal) this.agregarProducto();
            this.onResetForm();
            this.close();
        } else {
            this.onResetForm();
        }
    }

    agregarProducto() {
        this.AddProduct.nombre = this.productForm.value['nombre_f'];
        this.AddProduct.unidadmedida = this.productForm.value['uni_med'];
        this.AddProduct.tipo = this.productForm.value['tipo_f'];
        this.AddProduct.linea = this.productForm.value['linea_f'];
        this.AddProduct.parte = this.productForm.value['parte_f'];
        this.AddProduct.precio = this.productForm.value['precio_f'];
        this.AddProduct.uni_9na = this.productForm.value['uni_9na_f'];
        this.AddProduct.uni_pan = this.productForm.value['uni_pan_f'];
        this.AddProduct.uni_sup = this.productForm.value['uni_sup_f'];
        this.AddProduct.categoria = this.productForm.value['cate_f'];

        console.log(this.AddProduct);


        this.dataService.postProduct(this.AddProduct).subscribe(
            res => {
                console.log(res);
                this.loadData();
            },
        );
    }


    selTip(item) {
        console.log(item);
    }



    // Valores de los campos del formulario
    get nombre_f() { return this.productForm.get('nombre_f'); }
    get parte_f() { return this.productForm.get('parte_f'); }
    get uni_9na_f() { return this.productForm.get('uni_9na_f'); }
    get uni_pan_f() { return this.productForm.get('uni_pan_f'); }
    get uni_sup_f() { return this.productForm.get('uni_sup_f'); }
    get precio_f() { return this.productForm.get('precio_f'); }
    get uni_med() { return this.productForm.get('uni_med'); }
    get tipo_f() { return this.productForm.get('tipo_f'); }
    get linea_f() { return this.productForm.get('linea_f'); }
    get cate_f() { return this.productForm.get('cate_f'); }


}
