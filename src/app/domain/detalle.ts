import { Factura } from "./factura";

export class Detalle{
    codigo_detalle?: number;
    descripcion_detalle?: string;
    precioUnitario_detalle?: number;
    cantidad_detalle?: number;
    precioTotal_detalle?:number;
    factura?: Factura;
} 