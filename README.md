# Título del Proyecto
WorkDone
## Breve descripción del proyecto.

Aplicacion desarrollada en React Native y Python, Cuenta con Login funcional y API con base de datos relacional.
Admite creacion de tareas, de usuarios
Cada tarea se puede eliminar, editar o cambiar su estado.
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/0a752ca5-4281-458e-825a-18aa8c9b9c19" alt="Diseño sin título (3)" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/5bbc627e-fe0b-4695-8602-09b6e4aad0ae" alt="Diseño sin título (1)" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/d0566e37-8e6c-4f0d-b476-e5c64692b4b3" alt="Diseño sin título (3)" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/fab815d3-4259-4927-a808-4c353b99bace" alt="Diseño sin título (4)" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/ac399d4c-cd7b-4912-b423-2ccf7a451906" alt="Diseño sin título" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/f9fa9e39-8411-4080-90da-f3c158ce372c" alt="Diseño sin título (2)" width="300">



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
  }
```

## Contribución

Indica si aceptas contribuciones y cómo los colaboradores pueden enviar sus mejoras. Establece pautas claras para las solicitudes de extracción y el estilo de código.

## Créditos

Creacion y desarollo por SeveralTool

## Licencia

Libre

## Contacto

severaltool.vercel.app


