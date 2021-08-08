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
    selector: 'ngx-cotizacion',
    templateUrl: './cotizacion.component.html',
    styleUrls: ['./cotizacion.component.scss'],
    providers: [DecimalPipe],
})
export class CotizacionComponent {
    cliente: Cliente[];
    vendedor: Vendedor[];
    crear = 0;

    producto: ProdPAD[];
    prodCot: ProdPAD[] = [];
    productos: Observable<ProdPAD[]>;

    cotizacion: Cotizacion = {id_trabajado:'0', id_cliente: '0', descuento:'0$'};

    productos_Cotizados = [];
    tipoDeDescuento = ['$','%'];
    tipo_seleccionado = '$';
    descuento = 0;
    total_neto = 0;

    filter = new FormControl('');

    constructor(
        public pipe: DecimalPipe,
        private service: DataService,
    ) {
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

    setIdTrabajador(id) {
        if (id === 0) this.cotizacion.id_trabajado = 0 + '';
        else{
            this.cotizacion.id_trabajado = id + '';
            console.log(id, this.cotizacion.id_trabajado);
        }
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

    setIdCliente(id) {
        if (id === 0) this.cotizacion.id_cliente = 0 + '';
        else{
            this.cotizacion.id_cliente = id + '';
            console.log(id, this.cotizacion.id_cliente);
        }
    }

    poductoSeleccionado(prod: ProdPAD) {

        var nuevo_Producto = [0,0,0,"",0,1];

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
        if (tamaño != this.productos_Cotizados.length){
            for (var x = tamaño; x < this.productos_Cotizados.length; x++)
                this.productos_Cotizados[x][0] = this.productos_Cotizados[x][0] - 1;
            this.productos_Cotizados.splice(id, 1);
        }
        else
            this.productos_Cotizados.splice(id, 1);

        this.total_neto = this.sumarTotal();
    }

    multiplicarCantidadPrecio(pos, cantidad){
        this.productos_Cotizados[pos][5] = cantidad;

        this.total_neto = this.sumarTotal();
    }

    sumarTotal() {
        var total_bruto = 0;
        this.productos_Cotizados.forEach(
            product =>
            total_bruto += product[4] * product[5]
        );

        if (total_bruto > 0){
            if (this.tipo_seleccionado == '$' && this.descuento > 0){
                total_bruto = total_bruto - this.descuento;
                return parseFloat(total_bruto.toFixed(2));
            }
            else if (this.tipo_seleccionado == '%' && this.descuento > 0){
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

    calcularDescuentoPorCiento(total){
        return (this.descuento * total) / 100; 
    }

    jsonProductosCotizados(id_cotizacion){
        var item = [];
        var productos = [];

        for (var x of this.productos_Cotizados) {
            item.push(id_cotizacion);
            item.push(x[2]);
            item.push(x[5]);
            productos.push(item);
            item = [];
        }

        return { "producto_cotizado":productos }
    }

    guardarCotizacion() {

        this.cotizacion.descuento = this.descuento + this.tipo_seleccionado;
        console.log(this.cotizacion)

        this.service.CreateCotizacion(this.cotizacion).subscribe(
            res => {
                if (res.mensaje === "Cotizacion Guardada") {
                    this.service.createProductoCotizado(this.jsonProductosCotizados(res.id)).subscribe(
                        res => {
                            console.log(res);
                            this.cotizacion = {id_cliente:'0',id_trabajado:'0',descuento:'0'};
                            this.productos_Cotizados = [];
                            this.descuento = 0;
                            this.total_neto = 0;
                            this.tipo_seleccionado = '$';

                        }
                    );
                }
            }
        );

    }

}
