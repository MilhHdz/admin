import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './dashboard.component';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AplicationsComponent } from './pages/productos/applications/applications.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ArmadorasComponent } from './pages/armadoras/armadoras.component';
import { LineasComponent } from './pages/lineas/lineas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { SagajiComponent } from './pages/sagaji/sagaji.component';
import { EquivalencesComponent } from './pages/productos/equivalences/equivalences.component';
import { AddEquivalencesComponent } from './pages/productos/equivalences/add-equivalences/add-equivalences.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { FacturaComponent } from './pages/factura/factura.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
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
      path: 'sagaji',
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
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
