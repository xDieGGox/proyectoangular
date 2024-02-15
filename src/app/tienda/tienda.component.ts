import { Component } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Producto } from '../domain/producto';
import { CategoriasService } from '../services/categorias.service';
import { Categoria } from '../domain/categoria';
import { Cliente } from '../domain/cliente';
import { Carrito } from '../domain/carrito';
import { ItemsService } from '../services/items.service';
import { Item } from '../domain/item';
import { CarritosService } from '../services/carritos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent {
  mostrarModal = false;
  nuevoProducto: Producto = new Producto();
  categoria: Categoria = new Categoria();
  productos: any;
  categorias: any;
  cliente: Cliente = new Cliente();
  carrito: Carrito = new Carrito();
  producto: Producto = new Producto();
  item: Item = new Item();
  cantidadSeleccionada: number=0;
  //Para el buscador
  nombreProductoABuscar: string = '';
  mostrarModalBusqueda: boolean = false;
  productosEncontrados: Producto[]=[];



  constructor(private productosService: ProductosService, private categoriasService: CategoriasService, private itemsService: ItemsService,private carritosService: CarritosService, private router: Router) { }


  ngOnInit(): void {
    this.productos = this.productosService.getProductos();
    this.categorias = this.categoriasService.getCategorias();
  }

  //METODO PARA AÑADIR AL CARRITO
  anadirCarrito(producto: Producto){
    console.log(producto);
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
      
      if(this.carrito && this.carrito.codigo_carrito !== undefined){
          const codigoCarrito: number = this.carrito.codigo_carrito;
          console.log("NUMERO CARRO: "+ codigoCarrito);

          this.carritosService.getCarritoPorCodigoCliente(codigoCarrito).subscribe(data=>{
            this.carrito=data;
            this.item.cantidad_item = this.cantidadSeleccionada;
            this.item.producto= producto;
            this.item.carrito=data;

            this.itemsService.saveItem(this.item).subscribe(data=>{
                console.log("ITEM CREADO");
            })
          })


      }else{

      }

      
      
    } else {
      console.log('El cliente no está almacenado en el localStorage');
    }
  }









  //PARA EL MODAL DE LA IMAGEN
  
  abrirModal() {
    this.mostrarModal = true;
    console.log("APLASTO EL CREAR")
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Crear una URL de objeto para la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.nuevoProducto.imagen_producto = e.target.result; // Almacenar la URL de objeto como la ubicación de la imagen
      };
      reader.readAsDataURL(file);
    }
  }

  crearProducto() {
    // Lógica para crear un nuevo producto
    console.log("Producto: "+this.nuevoProducto)
    this.nuevoProducto.categoria = this.categoria;
    
    
    this.productosService.saveProducto(this.nuevoProducto).subscribe(data => {
        console.log(data);
        if(data.codigo == 1)
          alert("Error al insertar "+ data.mensaje);
        else
          this.ngOnInit();
    })
    
  }


  //PARA LA TRANSFERENCIA DE QUE SE PIDE ESTO NO IMPORTA
  enviar(){
    this.productosService.envioTransferencia("ENVIADO DESDE VISUAL").subscribe(data=>{
      console.log(data);
    })
  }


  verProducto(producto: Producto) {
    this.router.navigate(['/producto'], { queryParams: { producto: JSON.stringify(producto) } });
  }


  // Método para buscar productos
  buscarProducto(nombreProducto: string) {
    this.productosService.getProductos().subscribe(data => {
      // Filtrar los productos según el nombre recibido
      this.productosEncontrados = data.filter((producto: Producto) =>
        producto.nombre_producto && producto.nombre_producto.toLowerCase().includes(nombreProducto.toLowerCase())
      );
      // Mostrar el modal de búsqueda
      this.mostrarModalBusqueda = true;
    });
  }
  
  
  // Método para cerrar el modal de búsqueda
  cerrarModalBusqueda() {
    this.mostrarModalBusqueda = false;
  }

}
