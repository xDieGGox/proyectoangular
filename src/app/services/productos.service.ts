import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { Producto } from '../domain/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private http: HttpClient) { }

  getProductos(){
    let url = enviroment.WS_PATH+"/productos/list";
    return this.http.get<any>(url);
  }

  saveProducto(producto: Producto){
    let url = enviroment.WS_PATH+"/productos";
    return this.http.post<any>(url, producto);
  }

  envioTransferencia(dato: string) {
    let url = enviroment.WS_PATH + "/transferencia";
    
    // Establecer las cabeceras para indicar que se está enviando JSON
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    // Enviar el dato como parte de un objeto JSON
    //return this.http.post<string>(url, { dato: dato }, { headers: headers });
    return this.http.post<string>(url, dato, { headers: headers }); //Este es el que envia solo el dato sin mas extras
    //return this.http.post<any>(url, dato);
  }

}
