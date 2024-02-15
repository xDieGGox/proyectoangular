import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Cliente } from '../domain/cliente';
import cli from '@angular/cli';
import { Factura } from '../domain/factura';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor() { }

  imprimirCliente(cliente: Cliente){
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });
    if(cliente.nombre_cliente != undefined){
      doc.text(cliente.nombre_cliente ,doc.internal.pageSize.width /2, 25,{align:'center'});
      autoTable(doc,{
        head: [['Name','Email','Country']],
        body: [
          ['David', 'david@example.com','Sweden'],
        ],
      });
      const hoy = new Date();
      doc.save(hoy.getDate()+hoy.getMonth()+'.pdf');
    }
    
  }

  imprimirFactura(cliente: any, factura: any, detalles: any) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });

    if (cliente.cedula_cliente !== undefined && cliente.nombre_cliente !== undefined) {
      doc.setFontSize(10);
      doc.text(`Número de Factura: ${factura.numero_factura}`, 20, 40);
      doc.text(`Cédula del Cliente: ${cliente.cedula_cliente}`, 20, 50);
      doc.text(`Nombre del Cliente: ${cliente.nombre_cliente}`, 20, 60);

      // Separar los detalles en nombre y cédula, e imprimirlos en la tabla
      const formattedDetalles = detalles.map((detalle: any) => [detalle.codigo_detalle,detalle.descripcion_detalle, detalle.cantidad_detalle,detalle.precioUnitario_detalle,detalle.precioTotal_detalle]);
      autoTable(doc, {
        startY: 90,
        head: [['Codigo', 'Descripcion','Cantidad','Precio unitario','Precio total']],
        body: formattedDetalles
      });

      // Texto debajo del autotable
      doc.text(`Subtotal: ${factura.subtotal_factura}`, 350, 250);
      doc.text(`Total: ${factura.total_factura}`, 350, 260);

      const hoy = new Date();
      doc.save('FAC' + hoy.getDate() + hoy.getMonth() + '.pdf');
    }
  }
}
