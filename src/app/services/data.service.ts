import { Injectable } from '@angular/core';
import { Aplication } from '../@core/data/productos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Categoria } from './../@core/data/categorias';
import { Linea } from './../@core/data/lineas';
import { Equivalencia } from './../@core/data/equivalencias';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    nombreProducto: string = 'Sin nombre...';
    sucursal: string = '1';
    url_host_dev: string = 'http://localhost:3050/'
    url_host_pro: string = 'https://api-padd.herokuapp.com/'

    test: Aplication[];
    CATEGORIAS: Categoria[];
    equivalencias: Equivalencia[];
    Lineas: Linea[];

    // Sagaji
    url_select2 = '';
    url_select3 = '';
    url_select4 = '';
    url_busqueda = '';
    url_equivalencias = '';
    url_aplicaciones = '';
    url_asociados = '';
    parte = '';

    constructor(private http: HttpClient) { }



    getSelect2(): Observable<any> {
        return this.http.get<any>(this.url_select2);
    }


    getSelect3(): Observable<any> {
        return this.http.get<any>(this.url_select3);
    }


    getSelect4(): Observable<any> {
        return this.http.get<any>(this.url_select4);
    }


    getBusqueda(): Observable<any> {
        return this.http.get<any>(this.url_busqueda);
    }


    getEquivalencias(clproducto: string): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'equivalentes/' + clproducto);
    }


    getAplicaciones(clproducto: string): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'aplicaciones/' + clproducto);
    }


    getAsociados(): Observable<any> {
        return this.http.get<any>(this.url_asociados);
    }


    // Obtener a todos los productos
    getAllProducts(): Observable<any> {
        return this.http.get<any>(this.url_host_dev + 'product/' + this.sucursal);
    }

    postProduct(prod: any): Observable<any> {
        return this.http.post(this.url_host_dev + 'product/' + this.sucursal, prod);
    }
    
    putProduct(id: string, prod: any) {
        return this.http.put(this.url_host_dev + 'product/' + this.sucursal + '/' + id, prod);
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete(this.url_host_dev + 'product/' + this.sucursal + '/' + id);
    }

    getAllCategories(): Observable<any> {
        return this.http.get<any>(this.url_host_dev + 'category/');
    }

    postCategry(cad: any): Observable<any> {
        return this.http.post(this.url_host_dev + 'category/', cad);
    }

    deleteCategory(id: string): Observable<any> {
        return this.http.delete(this.url_host_pro + 'category/' + id);
    }

    getAllModels(): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'modelo/');
    }

    getAllDrescription(): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'descripcion/');
    }

    getAllArmadora(): Observable<any> {
        return this.http.get<any>(this.url_host_dev + 'armadora/');
    }

    postArmadora(arm: any): Observable<any> {
        return this.http.post(this.url_host_pro + 'armadora/', arm);
    }

    deleteArmadora(id: string): Observable<any> {
        return this.http.delete(this.url_host_pro + 'armadora/' + id);
    }

    getAllLine(): Observable<any> {
        return this.http.get<any>(this.url_host_dev + 'linea/');
    }

    postLine(lin: any): Observable<any> {
        return this.http.post(this.url_host_pro + 'linea/', lin);
    }

    deleteLine(id: string): Observable<any> {
        return this.http.delete(this.url_host_pro + 'linea/' + id);
    }

    getAllProveedor(): Observable<any> {
        return this.http.get<any>(this.url_host_dev + 'proveedor/' + this.sucursal);
    }

    postProveedor(prov: any): Observable<any> {
        return this.http.post(this.url_host_dev + 'proveedor/' + this.sucursal, prov);
    }

    deleteProveedor(id: string): Observable<any> {
        return this.http.delete(this.url_host_dev + 'proveedor/' + this.sucursal + '/' + id);
    }

    getAllFactura(): Observable<any> {
        return this.http.get<any>(this.url_host_dev + 'factura/' + this.sucursal);
    }

    postFactura(fact: any): Observable<any> {
        return this.http.post(this.url_host_pro + 'factura/', fact);
    }

    deleteFactura(id: string): Observable<any> {
        return this.http.delete(this.url_host_pro + 'factura/' + id);
    }

    getAllCliente(): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'cliente/');
    }

    postCliente(clie: any): Observable<any> {
        return this.http.post(this.url_host_pro + 'cliente/', clie);
    }

    deleteCliente(id: string): Observable<any> {
        return this.http.delete(this.url_host_pro + 'cliente/' + id);
    }

    getAllVendedor(): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'vendedor/');
    }

    deleteVendedor(id: string): Observable<any> {
        return this.http.delete(this.url_host_pro + 'vendedor/' + id);
    }

    getAllCotizacion(): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'cotizacion/');
    }

    getAllCotizacionByIdCliente(id: string): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'cotizacion/cliente/' + id);
    }

    CreateCotizacion(cot: any): Observable<any> {
        return this.http.post(this.url_host_pro + 'cotizacion/', cot);
    }

    getAllProductoCotizado(): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'producto-cotizado/');
    }

    getAllProductoCotizadoByIdCotizacion(id): Observable<any> {
        return this.http.get<any>(this.url_host_pro + 'producto-cotizado/cotizacion/' + id);
    }

    createProductoCotizado(proCot: any): Observable<any> {
        return this.http.post(this.url_host_pro + 'producto-cotizado', proCot);
    }

    getAllUnit(): Observable<any> {
        return this.http.get<any>(this.url_host_dev + 'unidad_de_medida');
    }
}
