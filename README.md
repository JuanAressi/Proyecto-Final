Guía de instalación
===================
Los requerimentos para instalar el proyecto son:
* Node.js 14.17.0 o superior
* npm 6.14.13 o superior
* git 2.30.1 o superior
* docker 20.10.17 o superior

Estas versiones son las que se han usado para el desarrollo del proyecto. Puede que funcione con versiones anteriores y/o posteriores, pero no se ha probado.


1) Clonar el repositorio localmente

    • git clone git@github.com:JuanAressi/Proyecto-Final.git

2) Instalar las dependencias
    
    • cd Proyecto-Final/front

    • npm install

3) Levantar los contenedores de docker

    • docker-compose up -d

4) Abrir una terminar en el contenedor 'proyecto-final_web'

    • composer install

    • php artisan migrate:fresh --seed


Ya se podría navegar el sitio en el puerto 3000 de localhost (http://localhost:3000/)
Puede tardar unos minutos en cargar las primeras veces.

Si no carga, entrar en la consola y si tira errores de que no puede cargar los componentes:

    • docker-compose down
    • docker system prune
    • cd Proyecto-Final/front
    • rm -rf node_modules
    • npm install
    • cd ..
    • docker-compose up -d
