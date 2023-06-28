import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,KeyboardAvoidingView
} from "react-native";
import Styles from "../styles/styles1";
import Icon from "react-native-vector-icons/FontAwesome";
import { eventEmitter } from "../App";

const LoginScreen = () => {
  const [login, setLogin] = useState(true);
  const [signup, setsignUp] = useState(false);
  const [btnlogin, setbtnlogin] = useState(true);
  const [btnsignup, setbtnsugnup] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [statusBtnLogin, setStatus] = useState(false);
  const [colorBtn1, setColor1] = useState("rgba(12, 22, 35, 0.8)");
  const [colorBtn2, setColor2] = useState("rgba(10, 9, 20, 0.8)");
  // Azul clarito rgba(12, 22, 35, 0.8)
  // Azul oscuro #0A0914

  //-------------------------------------------------------------

  //Funcion para login
  let clicks = 0;
  // let timeOn = false
  function InLogin() {
    console.log("funcion login");
    clicks++;
    if (clicks >= 5) {
      setWarning("Maximum attempts has been reached");
      setStatus(true);
      setTimeout(() => {
        setStatus(false);
        setWarning("");
      }, 5000);
    } else {
      const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (email.length < 5 || emailFormat.test(email) === false) {
        console.log("invalid email");
      } else {
        if (password.length > 0 && password.length <= 32) {
          fetch(
            `http://127.0.0.1:5000/getuserdata?email=${encodeURIComponent(
              email
            )}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (Object.keys(data).length === 0) {
                setWarning("Your email has not been found");
                setPassword("");
                setTimeout(() => {
                  setWarning("");
                }, 3000);
              } else {
                if (data[0][2] == password) {
                  console.log(data);
                  eventEmitter.emit("login");
                  setEmail("");
                  setPassword("");
                } else {
                  setPassword("");
                  setWarning("Invalid password");
                  setTimeout(() => {
                    setWarning("");
                  }, 5000);
                }
              }
            })
            .catch((error) => console.error(error));
        } else {
          setWarning("Invalid Password");
          setTimeout(() => {
            setWarning("");
          }, 5000);
        }
      }
    }
  }

  //-------------------------------------------------------------

  // Función para crear una cuenta nueva
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

  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //-------------------------------------------------------------

  return (
    <KeyboardAvoidingView keyboardShouldPersistTaps={'handled'} contentContainerStyle={Styles.container} style={[{flex:1}]}>
        <ImageBackground
      style={Styles.backgroundImage}
      source={require("../assets/backLogin.jpg")}
    >
      <View style={Styles.container}>
        <View style={Styles.imgLoginContainer}>
          <Image
            style={Styles.imgLogin}
            source={require("../assets/WorkDone.png")}
          />
        </View>
        <View style={Styles.loginContainer}>
          <View style={Styles.btnWindowsLoginContainer}>
            <TouchableOpacity
              style={[Styles.btnLogin, { backgroundColor: colorBtn1 }]}
              onPress={() => {
                setLogin(true);
                setsignUp(false);
                setbtnlogin(true);
                setbtnsugnup(false);
                setPassword("");
                setColor1("#0C1623"), setColor2("#0A0914");
              }}
            >
              <Text style={Styles.TxtBtn}>Log-in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.btnLogin, { backgroundColor: colorBtn2 }]}
              onPress={() => {
                setLogin(false);
                setsignUp(true);
                setbtnlogin(false);
                setbtnsugnup(true);
                setPassword("");
                setColor1("#0A0914");
                setColor2("#0C1623");
              }}
            >
              <Text style={Styles.TxtBtn}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Login Window */}
          {login && (
            <View style={Styles.FormContainer}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                maxLength={255}
                placeholder="email"
                placeholderTextColor={"grey"}
                style={Styles.InputsForm}
              ></TextInput>
              <TextInput
                value={password} secureTextEntry={true}
                onChangeText={setPassword}
                maxLength={32}
                placeholder="password"
                placeholderTextColor={"grey"}
                style={Styles.InputsForm}
              ></TextInput>
              <Text style={Styles.txtWarning}>{warning}</Text>
            </View>
          )}

          {/* Create account Window */}
          {signup && (
            <View style={Styles.FormContainer}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                maxLength={255}
                placeholder="email"
                placeholderTextColor={"grey"}
                style={Styles.InputsForm}
              ></TextInput>
              <TextInput
                value={name}
                onChangeText={setName}
                maxLength={15}
                placeholder="name"
                placeholderTextColor={"grey"}
                style={Styles.InputsForm}
              ></TextInput>
              <TextInput
                value={password}
                onChangeText={setPassword} secureTextEntry={true}
                maxLength={32}
                placeholder="password"
                placeholderTextColor={"grey"}
                style={Styles.InputsForm}
              ></TextInput>
              <Text style={Styles.txtWarning}>{warning}</Text>
            </View>
          )}

          {/* Btn Login */}
          {btnlogin && (
            <TouchableOpacity
              disabled={statusBtnLogin}
              style={Styles.BtnForms}
              onPress={InLogin}
            >
              <Text style={Styles.txtBtnLogin}>Login</Text>
            </TouchableOpacity>
          )}

          {/* Btn Create account */}
          {btnsignup && (
            <TouchableOpacity style={Styles.BtnForms} onPress={createAccount}>
              <Text style={Styles.txtBtnLogin}>Create</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={Styles.loginIcons}>
          <Icon style={Styles.icons} name="google" size={30} color="#fff" />
          <Icon style={Styles.icons} name="github" size={30} color="#DB4437" />
        </View>
        <Text style={Styles.versionTxt}>@WorkDone v1.0.1</Text>
      </View>
    </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
