import { Carrito } from "./carrito";
import { Producto } from "./producto";

export class Item{
    codigo_item?: number;
    cantidad_item?: number;
    producto?: Producto;
    carrito?: Carrito;
} 