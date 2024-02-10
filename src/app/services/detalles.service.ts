import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detalle } from '../domain/detalle';
import { enviroment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class DetallesService {

  constructor(private http: HttpClient) { }

  saveDetalle(detalle: Detalle){
    let url = enviroment.WS_PATH+"/detalles";
    return this.http.post<any>(url, detalle);
  }

  getDetallesPorCodigoFactura(codigo: number){
    let url = enviroment.WS_PATH+"/detalles/listaDetalles?codigo="+codigo;
    return this.http.get<any>(url);
  }
}
