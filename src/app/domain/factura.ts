import { Cliente } from "./cliente";

export class Factura{
    codigo_factura?: number;
    numero_factura?: string;
    subtotal_factura?: number
    total_factura?: number;
    cliente?: Cliente;
} 