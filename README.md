# WorkDone

## Brief description of the project.
Application developed in React Native and Python with Flask, It has a functional Login and API with a relational database. 
Supports creation of tasks, users Each task can be deleted, edited or change its status.

## Images
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/94d937f4-9cff-483b-a458-0614d3b7da1e" alt="Diseño sin título (3)" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/5bbc627e-fe0b-4695-8602-09b6e4aad0ae" alt="Diseño sin título (1)" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/d0566e37-8e6c-4f0d-b476-e5c64692b4b3" alt="Diseño sin título (3)" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/fab815d3-4259-4927-a808-4c353b99bace" alt="Diseño sin título (4)" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/ac399d4c-cd7b-4912-b423-2ccf7a451906" alt="Diseño sin título" width="300">
<img src="https://github.com/SeveralTool/WorkDone/assets/40505451/f9fa9e39-8411-4080-90da-f3c158ce372c" alt="Diseño sin título (2)" width="300">



## Table of Contents
- [Installation](#installation)
- [Use](#use)
- [Contribution](#contribution)
- [Credits](#credits)
- [License](#license)
- [Contact](#contact)

## Facility
Apk available in the repository for installation || (deprecated)

## Use
Example function to create account:
```
async function createAccount() {
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

## Credits
Creation and development by SeveralTool

## License
Free

## Contact
severaltool.vercel.app


