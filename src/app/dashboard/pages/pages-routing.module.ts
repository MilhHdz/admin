import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './pages.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ArmadorasComponent } from './armadoras/armadoras.component';
import { LineasComponent } from './lineas/lineas.component';
import { AplicationsComponent } from './productos/applications/applications.component';
import { EquivalencesComponent } from './productos/equivalences/equivalences.component';
import { ClientesComponent } from './clientes/clientes.component';
import { SagajiComponent } from './sagaji/sagaji.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { FacturaComponent } from './factura/factura.component';
import { AddEquivalencesComponent } from './productos/equivalences/add-equivalences/add-equivalences.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'productos',
      component: ProductosComponent,
    },
    {
      path: 'productos/:id/applications',
      component: AplicationsComponent,
    },
    {
      path: 'productos/:id/equivalences',
      component: EquivalencesComponent,
    },
    {
      path: 'productos/:id/equivalences/agregar',
      component: AddEquivalencesComponent,
    },
    {
      path: 'categorias',
      component: CategoriasComponent,
    },
    {
      path: 'armadoras',
      component: ArmadorasComponent,
    },
    {
      path: 'lineas',
      component: LineasComponent,
    },
    {
      path: 'clientes',
      component: ClientesComponent,
    },
    {
      path: 'sajagi',
      component: SagajiComponent,
    },
    {
        path: 'proveedores',
        component: ProveedorComponent,
    },
    {
        path: 'facturas',
        component: FacturaComponent,
    },
    {
      path: '',
      redirectTo: 'productos',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  ProductosComponent,
  AplicationsComponent,
  CategoriasComponent,
  ArmadorasComponent,
  LineasComponent,
  ClientesComponent,
  SagajiComponent,
  ProveedorComponent,
  FacturaComponent,
  EquivalencesComponent,
  AddEquivalencesComponent,
];
