import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { Cliente } from '../domain/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  saveCliente(cliente: Cliente){
    let url = enviroment.WS_PATH+"/clientes";
    return this.http.post<any>(url, cliente);
  }

  getClientes(){
    let url = enviroment.WS_PATH+"/clientes/list";
    return this.http.get<any>(url);
  }

  getClienteCorreo(correo: string){
    let url = enviroment.WS_PATH+"/clientes?correo="+correo;
    return this.http.get<any>(url);
  }
}
