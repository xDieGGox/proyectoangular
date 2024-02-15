import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  pages = [
    {title: 'Inicio', path: 'inicio'},
    {title: 'Tienda', path: 'tienda'},
    {title: 'Nosotros', path: 'nosotros'},
    {title: 'Registrarse', path: 'registro'},
    {title: 'Mi Carrito', path: 'micarrito'},
  ]

  //Cambia al componente .menu para qie se pueda desplegar como toggle
  toggleMenu() {
    const menu = document.querySelector('.menu');
    if (menu) { // Verifica si menu no es null
      menu.classList.toggle('open');
    }
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');

    // Verifica que navbar no sea nulo antes de intentar acceder a sus propiedades
    if (navbar) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }



  
}
