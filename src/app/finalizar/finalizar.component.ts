import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrl: './finalizar.component.scss'
})
export class FinalizarComponent {

constructor(private router: Router){}
  volver(){
    this.router.navigate(['/inicio']);
  }
}
