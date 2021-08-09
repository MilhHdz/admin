import { Component, PipeTransform } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NbIconLibraries } from '@nebular/theme';

import { PRODUCTO } from '../../../@core/data/productos';
import { Factura } from 'app/@core/data/Facturas';
import { Proveedor } from 'app/@core/data/Proveedores';
import { DataService } from 'app/services/data.service';
import { UNIDAD_DE_MEDIDA } from 'app/@core/data/unidad_de_medida';
import { Tipo_De_Producto } from 'app/@core/data/tipo-de-producto';
import { ARMADORA } from 'app/@core/data/armadoras';

@Component({
    selector: 'ngx-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss'],
    providers: [DecimalPipe],
})
export class ProductosComponent {
    productos_a_mostrar: Observable<PRODUCTO[]>;
    producto_en_almacen: PRODUCTO[];
    producto_terminado: PRODUCTO[];
    producto_a_actualizar: PRODUCTO;
    facturas: Factura[];
    proveedores: Proveedor[];
    unidades: UNIDAD_DE_MEDIDA[];
    tipoPro: Tipo_De_Producto[];
    modelo: Tipo_De_Producto[];
    armadora: ARMADORA[];
    linea: ARMADORA[];
    categoria: ARMADORA[];
    addprod: PRODUCTO = {
        'nombre': '',
        'unidad_de_medida': 'NO HAY REFERENCIA',
        'tipo_de_producto': '00000000',
        'clave_sat': '',
        'linea': '',
        'categoria': '',
        'parte': '',
        'precio': '',
        'cantidad': '',
        'proveedor': 'NO HAY REFERENCIA',
        'factura': 'NO HAY REFERENCIA'
    };

    optionModal: boolean = false;

    createFormGroup() {
        return new FormGroup({
            unidad_de_medida_f: new FormControl(''),
            tipo_de_producto_f: new FormControl(''),
            linea_f: new FormControl(''),
            categoria_f: new FormControl(''),
            parte_f: new FormControl(''),
            nombre_f: new FormControl('', Validators.required),
            cantidad_f: new FormControl('', Validators.required),
            precio_f: new FormControl('', Validators.required),
            proveedor_f: new FormControl(''),
            factura_f: new FormControl(''),
            clave_sat_f: new FormControl(''),
        });
    }

    productoFormulario: FormGroup;
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
        
        this.productoFormulario = this.createFormGroup();
        this.cargarDatos();
    }

    cargarDatos() {
        this.producto_en_almacen = [];
        this.producto_terminado = [];

        this.obtenerProductos();
    }


    obtenerProductos() {
        this.service.getAllProducts().subscribe(
            res => {
                if (res.code === 200) {
                    for (var item of res.result) {
                        if (item.cantidad !== "0")
                            this.producto_en_almacen.push(item);
                        else this.producto_terminado.push(item);
                    }
                    this.productos_a_mostrar = this.filter.valueChanges.pipe(
                        startWith(''),
                        map(text => this.search(text, this.pipe)),
                    );
                }
            }
        );
    }


    search(text: string, pipe: PipeTransform): PRODUCTO[] {
        return this.producto_en_almacen.filter(producto => {
            const term = text.toLowerCase();
            return producto.nombre.toLowerCase().includes(term)
                || producto.tipo_de_producto.toLowerCase().includes(term)
                || producto.linea.toLowerCase().includes(term)
                || producto.categoria.toLowerCase().includes(term)
                || producto.parte.toLowerCase().includes(term);
        });
    }

    // ACCIONES DE PRODUCTOS
    asignarInformaionDeProducto(producto) {
        this.service.nombreProducto = producto.nombre;
        this.service.parte = producto.parte;
    }

    cargarFacturas() {
        this.service.getAllFactura().subscribe(
            res => {
                if (res.code === 200)
                    this.facturas = res.result;
            }
        );
    }

    cargarProveedores() {
        this.service.getAllProveedor().subscribe(
            res => {
                if (res.code === 200)
                    this.proveedores = res.result;
            }
        );
    }

    cargarUnidadDeMedida() {
        this.service.getAllUnit().subscribe(
            res => {
                if (res.code === 200)
                    this.unidades = res.result;
            }
        );
    }

    cargarArmadora() {
        this.service.url_select2 = 'https://api-padd.herokuapp.com/sagaji/ArmadoraModeloDescripcion';
        this.service.getSelect2().subscribe(
            res => {
                this.armadora = res;
                this.modelo = [];
                this.tipoPro = [];
            }
        );
    }

    cargarModelo(clclave) {
        this.service.url_select3 = this.service.url_select2 + '/' + clclave;
        this.service.getSelect3().subscribe(
            res => {
                this.modelo = res;
                this.tipoPro = [];
            }
        );
    }

    cargarTipodeProducto(clclave) {
        this.service.url_select4 = this.service.url_select3 + '/' + clclave;
        this.service.getSelect4().subscribe(
            res => { this.tipoPro = res; }
        );
    }

    cargarCategorias() {
        this.service.getAllCategories().subscribe(
            res => {
                this.categoria = res;
            },
        );
    }

    cargarLineas() {
        this.service.getAllLine().subscribe(
            res => {
                this.linea = res;
            },
        );
    }

    abrirModal(content, option, producto: PRODUCTO) {
        this.optionModal = option;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

        this.cargarFacturas();
        this.cargarProveedores();
        this.cargarUnidadDeMedida();

        if (option === false) {
            this.producto_a_actualizar = producto;
            
            this.cantidad_f.setValue(producto.cantidad);
            this.precio_f.setValue(producto.precio);
            this.unidad_de_medida_f.setValue(producto.unidad_de_medida);
            this.proveedor_f.setValue(producto.proveedor);
            this.factura_f.setValue(producto.factura);
        }
        else {
            this.cargarArmadora();
            this.cargarLineas();
            this.cargarCategorias();
        }
    }


    agregarProducto() {
        if (this.productoFormulario.valid) {
            this.alertaInicial('Agregando producto');
            if (this.optionModal) this.guardarInformacion();
            this.productoFormulario.reset();
            this.close();
        }
        else this.productoFormulario.reset();
    }

    guardarInformacion() {
        this.addprod.nombre = this.productoFormulario.value['nombre_f'];
        this.addprod.unidad_de_medida = this.productoFormulario.value['unidad_de_medida_f'];
        this.addprod.tipo_de_producto = this.productoFormulario.value['tipo_de_producto_f'];
        this.addprod.linea = this.productoFormulario.value['linea_f'];
        this.addprod.parte = this.productoFormulario.value['parte_f'];
        this.addprod.precio = this.productoFormulario.value['precio_f'];
        this.addprod.cantidad = this.productoFormulario.value['cantidad_f'];
        this.addprod.categoria = this.productoFormulario.value['categoria_f'];
        this.addprod.proveedor = this.productoFormulario.value['proveedor_f'];
        this.addprod.factura = this.productoFormulario.value['factura_f'];

        this.service.postProduct(this.addprod).subscribe(
            res => {
                if (res.code === 200){
                    this.cargarDatos();
                    this.alertaFinal('Buen trabajo', 'Se ha agregado un nuevo producto', 'success');
                }
                else this.alertaFinal('Ocurrio un error', 'Intentalo de nuevo', 'error');
            }
        );
    }


    actualizarProducto() {
        this.producto_a_actualizar.cantidad = this.productoFormulario.value['cantidad_f'];
        this.producto_a_actualizar.precio = this.productoFormulario.value['precio_f'];
        this.producto_a_actualizar.unidad_de_medida = this.productoFormulario.value['unidad_de_medida_f'];
        this.producto_a_actualizar.proveedor = this.productoFormulario.value['proveedor_f'];
        this.producto_a_actualizar.factura = this.productoFormulario.value['factura_f'];

        this.alertaInicial('Actualizar producto');
        this.service.putProduct(this.producto_a_actualizar.id, this.producto_a_actualizar).subscribe(
            res => {
                if (res.code === 200){
                    this.cargarDatos();
                    this.alertaFinal('Buen trabajo', 'Se ha actualizado un producto', 'success');
                }
                else this.alertaFinal('Ocurrio un error', 'Intentalo de nuevo', 'error');
            }
        );
        this.close();
    }

    eliminarProducto(id) {
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
                this.service.deleteProduct(id).subscribe(
                    res => {
                        if (res.code === 200) {
                            this.cargarDatos();
                            this.alertaFinal('Buen trabajo', 'Se ha eliminado con exito', 'success');
                        }
                        else this.alertaFinal('Ocurrio un error', 'Intentalo de nuevo', 'error');
                    }
                );
            }
        })
    }


    close() {
        this.modalService.dismissAll();
    }

    // ALERTAS 
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


    // Valores de los campos del formulario
    get nombre_f() { return this.productoFormulario.get('nombre_f'); }
    get parte_f() { return this.productoFormulario.get('parte_f'); }
    get cantidad_f() { return this.productoFormulario.get('cantidad_f'); }
    get clave_sat_f() { return this.productoFormulario.get('clave_sat_f'); }
    get precio_f() { return this.productoFormulario.get('precio_f'); }
    get unidad_de_medida_f() { return this.productoFormulario.get('unidad_de_medida_f'); }
    get tipo_de_producto_f() { return this.productoFormulario.get('tipo_de_producto_f'); }
    get linea_f() { return this.productoFormulario.get('linea_f'); }
    get categoria_f() { return this.productoFormulario.get('categoria_f'); }
    get proveedor_f() { return this.productoFormulario.get('proveedor_f'); }
    get factura_f() { return this.productoFormulario.get('factura_f'); }

}