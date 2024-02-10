import { Component } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { CarritosService } from '../services/carritos.service';
import { Cliente } from '../domain/cliente';
import { Carrito } from '../domain/carrito';
import { ItemsService } from '../services/items.service';
import { FacturasService } from '../services/facturas.service';
import { Factura } from '../domain/factura';
import { DetallesService } from '../services/detalles.service';
import { Detalle } from '../domain/detalle';
import { Console } from 'console';
import { Router } from '@angular/router';
import { Item } from '../domain/item';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {
  cliente: Cliente = new Cliente();
  carrito: Carrito = new Carrito();
  factura: Factura = new Factura();
  facturaNueva: Factura= new Factura();
  detalle: Detalle = new Detalle();
  itemEliminar : Item = new Item();

  items: any;
  PrexCan:number = 0;
  subtotal:number = 0;
  total:number = 0;
  totalDetalle:number =0;
  ultimoNumeroFactura:string="";

  constructor(private router: Router,private clienteServices: ClientesService, private carritosService: CarritosService, private itemsService: ItemsService, private facturasService: FacturasService, private detallesService: DetallesService){

  }

  ngOnInit(): void {

  if (typeof localStorage !== 'undefined') {
      
    const clienteString = localStorage.getItem("personaLogueada");
    const carritoString = localStorage.getItem("carritoLogueado");

    // Verificar si el valor recuperado no es nulo
    if (clienteString != null && carritoString != null) {
      // Parsear la cadena JSON
      this.cliente = JSON.parse(clienteString);
      this.carrito = JSON.parse(carritoString);
      // Ahora puedes hacer lo que necesites con this.cliente
      console.log('Cliente recuperado del localStorage:', this.cliente);
      console.log('Carrito recuperado del localStorage:', this.carrito.codigo_carrito);
      
      if(this.carrito && this.carrito.codigo_carrito && this.cliente.correo_cliente !== undefined){
          const correoCliente: string = this.cliente.correo_cliente;
          const codigoCarrito: number = this.carrito.codigo_carrito;
          this.clienteServices.getClienteCorreo(correoCliente).subscribe(data=>{
            this.cliente=data;
            this.factura.cliente=data;

            this.itemsService.getItemsPorCodigoCarrito(codigoCarrito).subscribe(data=>{
              this.items=data;
            })

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


  realizarCompra(){

    // Verifica si hay elementos en el array de items
    if (this.items && this.items.length > 0) {
      // Recorre cada elemento del array de items
      this.items.forEach((item: any) => {
        // Aquí se realizan las acciones con cada elemento del array
        console.log('Item:', item);
        this.PrexCan= item.cantidad_item*item.producto.precio_producto;
        this.subtotal=this.subtotal+this.PrexCan;
        
        //this.factura.total_factura=this.subtotal*  

      });

      this.factura.numero_factura="FAC"+Date.now();
      this.ultimoNumeroFactura= this.factura.numero_factura;
      console.log("SUBTOTAL: "+this.subtotal);
      this.factura.subtotal_factura=this.subtotal;
      this.total=parseFloat((this.subtotal * 1.12).toFixed(2));
      this.factura.total_factura=this.total;
      console.log("TOTAL: "+ this.total);

    } else {
      console.log('El array de items está vacío.');
    }

    this.facturasService.saveFactura(this.factura).subscribe(data=>{
      console.log("FACTURA CREADA"+data);
      this.facturasService.getFacturaPorNumero(this.ultimoNumeroFactura).subscribe(data=>{
        //console.log(data);
        this.detalle.factura = data;
        this.items.forEach((item: any) => {
          // Aquí se realizan las acciones con cada elemento del array
          console.log('Item:' + item);
          this.detalle.descripcion_detalle = item.producto.nombre_producto;
          this.detalle.cantidad_detalle = item.cantidad_item;
          this.detalle.precioUnitario_detalle = item.producto.precio_producto;
          this.totalDetalle = item.cantidad_item*item.producto.precio_producto;
          this.detalle.precioTotal_detalle = this.totalDetalle;
          
          
          console.log("DETALLE:"+ data);
          
          
          this.detallesService.saveDetalle(this.detalle).subscribe(data=>{
            console.log("DETALLE CREADO");
            this.router.navigate(['/misfacturas']);
          })
          
  
        });
      });


      })
      
  }


  eliminarItem(item:Item){
    this.itemEliminar=item;
    console.log(this.itemEliminar);
    if(this.itemEliminar.codigo_item!=undefined){
      const codigoitem: number = this.itemEliminar.codigo_item;
      this.itemsService.deleteItem(codigoitem).subscribe(data=>{
        console.log("ITEM ELIMINADO");
        //this.ngOnInit();
      })
    }

    
    
    
  }



}




