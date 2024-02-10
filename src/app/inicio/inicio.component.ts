import { Component } from '@angular/core';
import { Cliente } from '../domain/cliente';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  cliente: Cliente = new Cliente();
  logueado: boolean = false;

  ngOnInit(): void{
    if (typeof localStorage !== 'undefined'){
      const clienteString = localStorage.getItem("personaLogueada");

      // Verificar si el valor recuperado no es nulo
      if (clienteString != null){
        this.cliente = JSON.parse(clienteString);
        this.logueado=true;
        // Ahora puedes hacer lo que necesites con this.cliente
        console.log('Cliente recuperado del localStorage:', this.cliente);
      }
    }
  }
 

}
