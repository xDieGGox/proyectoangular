import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../domain/item';
import { enviroment } from '../../enviroments/enviroments';
import { Carrito } from '../domain/carrito';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  saveItem(item: Item){
    let url = enviroment.WS_PATH+"/items";
    return this.http.post<any>(url, item);
  }

  getItemsPorCodigoCarrito(codigo: number){
    let url = enviroment.WS_PATH+"/items/listaItems?codigo="+codigo;
    return this.http.get<any>(url);
  }

  deleteItem(codigo: number){
    let url = enviroment.WS_PATH+"/items?id="+codigo;
    return this.http.delete<any>(url); 
  }
}
