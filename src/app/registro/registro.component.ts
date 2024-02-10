import { Component, OnInit } from '@angular/core';
import { Cliente } from '../domain/cliente';
import { ClientesService } from '../services/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  clientes: any;
  cliente: Cliente = new Cliente();

  constructor(private clientesService: ClientesService, private router: Router){
    
  }

  ngOnInit(): void {
    this.clientes = this.clientesService.getClientes();
  }

  guardarCliente(){
    console.log("LLEGA ");
    console.log(this.cliente);
    this.clientesService.saveCliente(this.cliente).subscribe(data => {
      console.log(data);
      if(data.codigo == 1)
        alert("Error al insertar cliente"+data.mensaje);
      else
        this.router.navigate(['/inicio']);
    })
  }

  vistaSesion(){
    this.router.navigate(['/login']);
  }

}
