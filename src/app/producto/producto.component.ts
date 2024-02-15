import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../domain/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  producto: Producto = new Producto();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['producto']) {
        this.producto = JSON.parse(params['producto']);
      }
    });
  }
}
