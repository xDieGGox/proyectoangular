# Proyectofinal

El proyecto final sobre el carrito de compras, funciona con dos tecnologías Angular para el frontend y Jakarta EE para el backend, estos dos funcionan mediante la creación de servicios y el consumo de los mismos. Para ver la aplicación en funcionamiento primero debe descargar el proyecto de JakartaEE y correrlo en el servidor de Eclipse, una vez que lo tenga configurado los parámetros como el standalone.xml y el persistence.xml, este debería funcionar.

Ahora primero para que funcione el Angular en este caso debemos seguir los comandos a continuación luego de haber clonado el repositorio de angular.

Se debieron instalar los módulos como el HttpClient, y el jsPDF para los reportes, pero otros mas propios de angular.

Recuerde que para poder cambiar los datos en caso de modificación podemos irnos al directorio de enviroment y dentro enviroment.ts, asi se cambia la tura en general por si se cambia en el proyecto de JakartaEE.

## Pasos para usabilidad
Para la creación de los clientes debe ir a registro, una vez este registrado debe ir a la misma ventana de registro pero oprimir el boton de inicias sesión para poder ingresar con su usuario, con este ya puede dirigirse a la tienda e ir agregando productos al carrito.
Para visualizar su carrito debe irse a la pestaña de Mi Carrito, ahí puede ver los productos agregados y también puede eliminarlos.

Finalmente cuando desea finalizar la compra, únicamente dentro del carrito debe ir al checkout, en donde verá su factura y debe presionar en ver, alli vera los detalles de lo que quiere comprar, y debe presionar el boton de comprar, llenar los datos de tarjeta y finalmente finalizar compra. Esto le creará su factura, y le descargará su factura como reporte en formato PDF.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
