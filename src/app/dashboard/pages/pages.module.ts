import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbTreeGridModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './pages-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditModalProductosComponent } from './productos/edit-modal/edit-modal.component';
// import { ProveedorComponent } from './proveedor/proveedor.component';
// import { FacturaComponent } from './factura/factura.component';
// import { SagajiComponent } from './sagaji/sagaji.component';

@NgModule({
  imports: [
    NbCardModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    ThemeModule,
    TablesRoutingModule,
    NbSelectModule,
    NbCheckboxModule,
    NbListModule,
  ],
  declarations: [
    ...routedComponents,
    EditModalProductosComponent,
    // ProveedorComponent,
    // FacturaComponent,
    // SagajiComponent,
  ],
})
export class TablesModule { }
