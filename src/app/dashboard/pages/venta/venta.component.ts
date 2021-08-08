import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


import { DataService } from 'app/services/data.service';
import { Cliente } from '../../../@core/data/clientes';
import { ProdPAD } from 'app/@core/data/productos';
import { map, startWith } from 'rxjs/operators';
import { Vendedor } from 'app/@core/data/vendedor';
import { Cotizacion } from 'app/@core/data/cotizacion';

@Component({
    selector: 'ngx-venta',
    templateUrl: './venta.component.html',
    styleUrls: ['./venta.component.scss'],
    providers: [DecimalPipe],
})
export class VentaComponent {
    cliente: Cliente[];
    cotizacion: Cotizacion[];
    vendedor: Vendedor;
    crear = 0;
    cambio = 0;
    pago_con = 0;
    producto_a_vender = [];
    elemento;

    producto: ProdPAD[];
    prodCot: ProdPAD[] = [];
    productos: Observable<ProdPAD[]>;

    productos_Cotizados = [];
    tipoDeDescuento = ['$', '%'];
    tipo_seleccionado = '$';
    descuento = 0;
    total_neto = 0;

    filter = new FormControl('');

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        public pipe: DecimalPipe,
        private service: DataService,
    ) {
        /*
        ** Configuracion para el el modal
        ** no se cierre al tocar fuera de
        ** su area.
        */
        config.backdrop = 'static';
        config.keyboard = false;

        this.elemento = document.getElementById('pago_con');

        this.loadData();
    }

    loadData() {
        this.getClientes();
        this.getVendedores();
        this.getProductos();
    }


    getClientes() {
        this.service.getAllCliente().subscribe(
            res => {
                this.cliente = res;
            }
        );
    }


    getVendedores() {
        this.service.getAllVendedor().subscribe(
            res => {
                this.vendedor = res;
            }
        );
    }


    getProductos() {
        this.service.getAllProducts().subscribe(
            res => {
                this.producto = res;

                this.productos = this.filter.valueChanges.pipe(
                    startWith(''),
                    map(text => this.search(text, this.pipe)),
                );
            }
        );
    }


    getCotizaciones(id) {
        this.service.getAllCotizacionByIdCliente(id).subscribe(
            res => {
                if (!res.mensaje){
                    this.cotizacion = res;
                }
                else
                    this.cotizacion = [];
            }
        );
    }


    search(text: string, pipe: PipeTransform): ProdPAD[] {
        return this.producto.filter(producto => {
            const term = text.toLowerCase();
            return producto.nombre.toLowerCase().includes(term)
                || producto.tipo.toLowerCase().includes(term)
                || producto.linea.toLowerCase().includes(term)
                || producto.categoria.toLowerCase().includes(term)
                || producto.parte.toLowerCase().includes(term);
        });
    }

    obtenerProductosCotizados(id) {
        if (id === 0) this.cotizacion = [];
        else {
            this.getCotizaciones(id);
        }
    }

    poductoSeleccionado(prod: ProdPAD) {
        // console.log(prod);

        var nuevo_Producto = [0, 0, 0, "", 0, 1];
        // id
        nuevo_Producto[0] = this.productos_Cotizados.length
        nuevo_Producto[2] = prod.id;
        nuevo_Producto[3] = prod.nombre;
        nuevo_Producto[4] = prod.precio;

        this.productos_Cotizados.push(nuevo_Producto);

        this.prodCot.push(prod);

        this.total_neto = this.sumarTotal();
    }

    eleminarUnProducto(id) {
        var tamaño = id + 1;
        if (tamaño != this.productos_Cotizados.length) {
            for (var x = tamaño; x < this.productos_Cotizados.length; x++)
                this.productos_Cotizados[x][0] = this.productos_Cotizados[x][0] - 1;
            this.productos_Cotizados.splice(id, 1);
        }
        else
            this.productos_Cotizados.splice(id, 1);

        this.total_neto = this.sumarTotal();
    }

    multiplicarCantidadPrecio(pos, tienda, cantidad) {
        this.producto_a_vender[pos][tienda] = cantidad; 

        // CANTIDAD
        this.producto_a_vender[pos][6] = this.producto_a_vender[pos][3] + this.producto_a_vender[pos][4] + this.producto_a_vender[pos][5];

        // COSTO
        this.producto_a_vender[pos][9] = parseFloat((this.producto_a_vender[pos][6] * this.producto_a_vender[pos][8]).toFixed(2));
        
        this.total_neto = this.sumarTotal();
    }

    sumarTotal() {
        var total_bruto = 0;

        this.producto_a_vender.forEach(
            item => total_bruto += item[9]
        );

        if (total_bruto > 0) {
            if (this.tipo_seleccionado == '$' && this.descuento > 0) {
                total_bruto = total_bruto - this.descuento;
                return parseFloat(total_bruto.toFixed(2));
            }
            else if (this.tipo_seleccionado == '%' && this.descuento > 0) {
                total_bruto = total_bruto - this.calcularDescuentoPorCiento(total_bruto);
                return parseFloat(total_bruto.toFixed(2));
            }
            else
                return parseFloat(total_bruto.toFixed(2));

        }
        else
            return parseFloat(total_bruto.toFixed(2));
    }

    asignarTipoDescuento(tipo) {
        this.tipo_seleccionado = tipo;
        this.total_neto = this.sumarTotal();
    }

    asignarCantidadDescuento(cantidad) {
        if (cantidad == null)
            this.descuento = 0;
        else
            this.descuento = cantidad;

        this.total_neto = this.sumarTotal();
    }

    calcularDescuentoPorCiento(total) {
        return (this.descuento * total) / 100;
    }

    calcularCambio(efectivo) {
        if (efectivo > this.total_neto)
            this.cambio = parseFloat((efectivo - this.total_neto).toFixed(2));
        else
            this.cambio = parseFloat((this.total_neto - efectivo).toFixed(2));
    }

    motrarProductosCotizados(id_cotizacion) {
        if (id_cotizacion == 0) this.producto_a_vender = [];
        else {
            this.total_neto = 0;
            this.producto_a_vender = [];
            this.service.getAllProductoCotizadoByIdCotizacion(id_cotizacion).subscribe(
                res => {
                    if (!res.mensaje){
                        console.log(res);
                        var valores = [0, 0]
                        for (var item of res){
                            valores[0] = item.id_producto;
                            valores[1] = item.cantidad;
                            this.agregarProductos(valores);
                        }
                    }
                }
            );
        }
    }

    agregarProductos(producto) {
        // num_fila[0], id_prod[1], nombre_prod[2], 9na[3], pan[4], sup[5], cantidad[6], solicitado[7] precio[8], total[9]
        var produc_view = [0, 0, '', 0, 0, 0, 0, 0, 0, 0]
        if (producto.length === 2) {
            for(var item of this.producto) {
                if (item.id === producto[0]) {
                    produc_view[0] = this.producto_a_vender.length;
                    produc_view[1] = parseInt(item.id);
                    produc_view[2] = item.nombre;
                    produc_view[3] = 0;
                    produc_view[4] = 0;
                    produc_view[5] = 0;
                    produc_view[6] = 0;
                    produc_view[7] = producto[1];
                    produc_view[8] = parseFloat(item.precio);
                    produc_view[9] = 0;
                    this.producto_a_vender.push(produc_view);
                    produc_view = [];
                }
            }

            //this.total_neto = this.sumarTotal();
            
        }
        else {
            console.log("Aqui va algo");
        }
    }

    openModal(content) {
        // this.elemento.innerHTML = this.total_neto;
        this.modalService.open(content, { scrollable: true });
    }

    closeModal(algo) {
        if (algo === 1){
            this.producto_a_vender = [];
            this.total_neto = 0;
            this.descuento = 0;
            this.cotizacion = [];
            this.cliente = [];
            this.loadData();
        }
        
        
        this.modalService.dismissAll();
    }
}
