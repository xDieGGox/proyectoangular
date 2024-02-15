import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../domain/cliente';
import { ClientesService } from '../services/clientes.service';
import { CarritosService } from '../services/carritos.service';
import { Carrito } from '../domain/carrito';
import { ReportesService } from '../services/reportes.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  correoUsuario: string = "";
  claveUsuario: string = "";
  cliente: Cliente = new Cliente();
  clienteLogueado: Cliente = new Cliente();
  codigoClienteLogueado: number = 0;
  carrito: Carrito = new Carrito();

  constructor(private router: Router, private clienteService: ClientesService, private carritoService: CarritosService, private reportesService: ReportesService){
    
  }


  iniciarSesion(){
    console.log("Correo: "+this.correoUsuario);
    console.log("Contraseña: "+this.claveUsuario);

    this.clienteService.getClienteCorreo(this.correoUsuario).subscribe(data =>{
      this.cliente=data;
      if(this.claveUsuario==this.cliente.clave_cliente){

        localStorage.setItem("personaLogueada",JSON.stringify(this.cliente));
      this.codigoClienteLogueado = data?.codigo_cliente;
      console.log("CODIGO A ENVIAR: "+this.codigoClienteLogueado);
      
      this.carrito.cliente= this.cliente;

      this.carritoService.getCarritoPorCodigoCliente(this.codigoClienteLogueado).subscribe(data =>{
        if(data==null){
          this.carrito.cliente=this.cliente;
          this.carritoService.saveCarrito(this.carrito).subscribe(data=>{
            console.log("CARRITO NUEVO CREADO");
            console.log(data);
            this.carritoService.getCarritoPorCodigoCliente(this.codigoClienteLogueado).subscribe(data=>{
              this.carrito=data;
              localStorage.setItem("carritoLogueado",JSON.stringify(this.carrito))
              //Esto es para imprimir de prueba
              this.reportesService.imprimirCliente(this.cliente);
              //this.router.navigate(['/inicio']);

            })
            
          })
        }else{
          console.log("YA EXISTE UN CARRITO") 
          this.carrito=data;
          localStorage.setItem("carritoLogueado",JSON.stringify(this.carrito));
          this.router.navigate(['/inicio']);

        }
      })

      }else{
        console.log("CONTRASEÑA INCORRECTA")
        alert("CONTRASEÑA INCORRECTA")
      }
      


    })

  }
}
