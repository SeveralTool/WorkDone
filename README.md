# Título del Proyecto
WorkDone
## Breve descripción del proyecto.

Aplicacion desarrollada en React Native y Python, Cuenta con Login funcional y API con base de datos relacional.
Admite creacion de tareas, de usuarios
Cada tarea se puede eliminar, editar o cambiar su estado.
<img src="[ruta_de_la_imagen.png](https://github.com/SeveralTool/WorkDone/assets/40505451/0a752ca5-4281-458e-825a-18aa8c9b9c19)"  style="width: 25%;">




## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Contribución](#contribución)
- [Créditos](#créditos)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Instalación

Apk disponible en el repositorio para su instalacion

## Uso
Ejemplo de fuincion Login:
```async function createAccount() {
    if (name.length > 0 && email.length > 0 && password.length > 0) {
      let data = "";
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/getuserdata?email=${encodeURIComponent(email)}`
        );
        data = await response.json();
        if (data === undefined || data === null || data.length == 0) {
          console.log("El usuario no existe, continuar");
          const createResponse = await fetch(
            `http://127.0.0.1:5000/pushnewuser?name=${encodeURIComponent(
              name
            )}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(
              password
            )}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: name,
                email: email,
                password: password,
              }),
            }
          );
          setName("");
          setEmail("");
          setPassword("");
        } else {
          setPassword("");
          setWarning("El correo electrónico ya existe");
          setTimeout(() => {
            setWarning("");
          }, 5000);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setWarning("Invalid data");
      setTimeout(() => {
        setWarning("");
      }, 5000);
    }
  }```

## Contribución

Indica si aceptas contribuciones y cómo los colaboradores pueden enviar sus mejoras. Establece pautas claras para las solicitudes de extracción y el estilo de código.

## Créditos

Creacion y desarollo por SeveralTool

## Licencia

Libre

## Contacto

severaltool.vercel.app


