import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';
import { FacturasService } from '../services/facturas.service';
import { DetallesService } from '../services/detalles.service';
import { Cliente } from '../domain/cliente';
import { Factura } from '../domain/factura';
import { Detalle } from '../domain/detalle';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent {
  facturaSeleccionada = false;
  cliente: Cliente = new Cliente();
  factura: Factura = new Factura(); 
  detalle: Detalle = new Detalle();
  detalles: any;
  facturas: any;
  corrreoCli:string="";
  
  constructor(private router: Router,private clienteServices: ClientesService, private facturasService: FacturasService, private detallesService: DetallesService){

  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      
      const clienteString = localStorage.getItem("personaLogueada");
  
      // Verificar si el valor recuperado no es nulo
      if (clienteString != null) {
        // Parsear la cadena JSON
        this.cliente = JSON.parse(clienteString);
        // Ahora puedes hacer lo que necesites con this.cliente
        console.log('Cliente recuperado del localStorage:', this.cliente);
        
        if(this.cliente.cedula_cliente !== undefined){
            const cedulaCliente: string = this.cliente.cedula_cliente;
            this.facturasService.getFacturasPorCedulaCliente(cedulaCliente).subscribe(data=>{
              this.facturas=data;
            })
  
        }else{
  
        }
        
      } else {
        console.log('El cliente no está almacenado en el localStorage');
      }
  
    } else {
        console.error('localStorage is not available');
    }
  }



  verFactura(codigoFactura: number, numeroFactura: string){
    this.facturaSeleccionada=true;
    if (typeof localStorage !== 'undefined'){
      const clienteString = localStorage.getItem("personaLogueada");
      if (clienteString != null){
        this.cliente = JSON.parse(clienteString); 
        if(this.cliente.correo_cliente !== undefined){
          const correoCliente: string = this.cliente.correo_cliente;
          this.clienteServices.getClienteCorreo(correoCliente).subscribe(data=>{
            this.cliente=data;
            this.facturasService.getFacturaPorNumero(numeroFactura).subscribe(data=>{
              this.factura=data;
              this.detallesService.getDetallesPorCodigoFactura(codigoFactura).subscribe(data=>{
                this.detalles=data;
              });
            })
          })
        }
      }
    }
  }


  modalVisible: boolean = false;
  mostrarModal(){
    this.modalVisible = true;
  }

  ocultarModal() {
    this.modalVisible = false;
  }

  finalizarCompra(){
    this.modalVisible = false;
  }
}
