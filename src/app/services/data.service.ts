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
        return this.http.get<any>('https://api-padd.herokuapp.com/equivalentes/' + clproducto);
    }


    getAplicaciones(clproducto: string): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/aplicaciones/' + clproducto);
    }


    getAsociados(): Observable<any> {
        return this.http.get<any>(this.url_asociados);
    }


    // Obtener a todos los productos
    getAllProducts(): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/product/');
    }

    postProduct(prod: any): Observable<any> {
        return this.http.post('https://api-padd.herokuapp.com/product/', prod);
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete('https://api-padd.herokuapp.com/product/' + id);
    }

    getAllCategories(): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/category/');
    }

    postCategry(cad: any): Observable<any> {
        return this.http.post('https://api-padd.herokuapp.com/category/', cad);
    }

    deleteCategory(id: string): Observable<any> {
        return this.http.delete('https://api-padd.herokuapp.com/category/' + id);
    }

    getAllModels(): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/modelo/');
    }

    getAllDrescription(): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/descripcion/');
    }

    getAllArmadora(): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/armadora/');
    }

    postArmadora(arm: any): Observable<any> {
        return this.http.post('https://api-padd.herokuapp.com/armadora/', arm);
    }

    deleteArmadora(id: string): Observable<any> {
        return this.http.delete('https://api-padd.herokuapp.com/armadora/' + id);
    }

    getAllLine(): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/linea/');
    }

    postLine(lin: any): Observable<any> {
        return this.http.post('https://api-padd.herokuapp.com/linea/', lin);
    }

    deleteLine(id: string): Observable<any> {
        return this.http.delete('https://api-padd.herokuapp.com/linea/' + id);
    }

    getAllProveedor(): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/proveedor/');
    }

    postProveedor(prov: any): Observable<any> {
        return this.http.post('https://api-padd.herokuapp.com/proveedor/', prov);
    }

    deleteProveedor(id: string): Observable<any> {
        return this.http.delete('https://api-padd.herokuapp.com/proveedor/' + id);
    }

    getAllFactura(): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/factura/');
    }

    postFactura(fact: any): Observable<any> {
        return this.http.post('https://api-padd.herokuapp.com/factura/', fact);
    }

    deleteFactura(id: string): Observable<any> {
        return this.http.delete('https://api-padd.herokuapp.com/factura/' + id);
    }

    getAllCliente(): Observable<any> {
        return this.http.get<any>('https://api-padd.herokuapp.com/cliente/');
    }

    postCliente(clie: any): Observable<any> {
        return this.http.post('https://api-padd.herokuapp.com/cliente/', clie);
    }

    deleteCliente(id: string): Observable<any> {
        return this.http.delete('https://api-padd.herokuapp.com/cliente  /' + id);
    }
}
