import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from '../domain/factura';
import { enviroment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) { }

  saveFactura(factura: Factura){
    let url = enviroment.WS_PATH+"/facturas";
    return this.http.post<any>(url, factura);
  }

  getFacturaPorNumero(numero: string){
    let url = enviroment.WS_PATH+"/facturas?numero="+numero;
    return this.http.get<any>(url);
  }

  getFacturasPorCedulaCliente(cedula: string){
    let url = enviroment.WS_PATH+"/facturas/listaFacCliente?dni="+cedula;
    return this.http.get<any>(url);
  }
}
