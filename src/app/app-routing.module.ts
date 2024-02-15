import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { TiendaComponent } from './tienda/tienda.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FacturaComponent } from './factura/factura.component';
import { ProductoComponent } from './producto/producto.component';
import { FinalizarComponent } from './finalizar/finalizar.component';

const routes: Routes = [
  {path:"inicio",component:InicioComponent},
  {path:"tienda",component:TiendaComponent},
  {path:"registro",component:RegistroComponent},
  {path:"login",component:LoginComponent},
  {path:"micarrito",component:CarritoComponent},
  {path:"misfacturas",component:FacturaComponent},
  {path:"producto",component:ProductoComponent},
  {path:"finalizar",component:FinalizarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
