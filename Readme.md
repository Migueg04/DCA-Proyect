# Convencion de commits. Para declarar las modificaciones de la version se usará la siguiente convencion. 
° `feat(scope)` -> Se usa para agregar una nueva funcionalidad.
° `fix(scope)` -> Se usa para corregir errores en el código. 
° `docs (scope)` -> Se usa para cambios en la documentación, como actualizar el README.md o agregar comentarios en el código.
° `refactor(scope)` -> Se usa para mejorar del código sin cambiar su funcionalidad
° `chore (scope)` -> Se usa para tareas de mantenimiento, como instalación de librerías o configuración del proyecto.

° scope -> indica la parte del proyecto afectada. 
° se puede agregar una descripción corta y concisa de los cambios realizados despues de un guion (-).

# Modelo de Ramificacion. En este proyecto utilizamos un modelo de ramificación basado en Git Flow para mantener el código organizado y facilitar el trabajo en equipo.

° `main` -> La rama principal. Contiene la versión estable y en producción. 
° `dev` -> La rama de desarrollo. Contiene el código actual en desarrollo donde se integran las nuevas funcionalidades antes de pasar a la rama `main`. 
° `git checkout -b feature/(funcionalidad)` -> Crea una rama para desarrollar una nueva característica sin afectar el código principal.

° No se debe trabajar directamente ni en la rama `main` ni en la rama `dev`. 
° Se debe crear una rama para cada característica o tarea que se quiera realizar. ° No se debe nombrar las ramas con el nombre del desarrollador. Esto solo será aceptado si varios trabajan en una misma caracteristica 
* Ej: git checkout -b feature/autenticacion-jwt-juan
* Ej: git checkout -b feature/autenticacion-jwt-pedro

° Se debe realizar un pull request para que se revise y apruebe el código antes de fusionarlo con la rama `dev` o `main`.