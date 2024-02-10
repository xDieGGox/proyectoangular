import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { Carrito } from '../domain/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritosService {

  constructor(private http: HttpClient) { }


  saveCarrito(carrito: Carrito){
    let url = enviroment.WS_PATH+"/carritos";
    return this.http.post<any>(url, carrito);
  }

  getCarritoPorCodigoCliente(codigo: number){
    let url = enviroment.WS_PATH+"/carritos?codigo="+codigo;
    return this.http.get<any>(url);
  }
}
