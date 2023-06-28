import SeeMore from 'react-native-see-more-inline';
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button, ScrollView, Image, PanResponder, Animated, ImageBackground } from "react-native";
import Styles from "../styles/styles1";
import Icon from "react-native-vector-icons/FontAwesome";
// import { FastBlurView } from 'react-native-fast-blur';
// import LoginScreen, {DATAUSER} from './LoginScreen';
import {App, eventEmitter} from '../App'


// //-------------------------------------------------------------

// if(Object.keys(DATAUSER).length > 0){
//   console.log(DATAUSER[1])
// }

//-------------------------------------------------------------



// CREAR LA HOMESCREEN
const HomeScreen = () => {
  // const [UserTasks, setUserTasks] = useUserTasks();
  const [refresh, setRefresh] = useState(false);
  const [tasks, setUserTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [askDelete, setWindowDel] = useState(false)
  const [data1,setData1] = useState("")
  const [data2,setData2] = useState("")
  
//-------------------------------------------------------------

  //GET TAKS FUNCTION
const getTasks = () => {

  useEffect(() => {
  fetch(`http://127.0.0.1:5000/getTasks/1`)
      .then((response) => response.json())
      .then((data) => setUserTasks(data))
      .catch((error) => console.error(error));
  }, []);
return tasks
};

//-------------------------------------------------------------

//DEL TASK FUNCTION
let delTask = () => {
// const [delTask, setDelTask] = useState([]);
// console.log("function to del tasks", user_id, task_id)
fetch(`http://127.0.0.1:5000/deleteTask/${data1}/${data2}`)
.then(() => {
  fetch(`http://127.0.0.1:5000/getTasks/1`)
  .then((response) => response.json())
  .then((data) => setUserTasks(data))
})
.catch((error) => console.error(error))
setWindowDel(false)
setData1("")
setData2("")
}

//-------------------------------------------------------------

//CHANGE STATUS TASK FUNCTION
let changeStatus = (user_id, task_id) => {
  // const [delTask, setDelTask] = useState([]);
  // console.log("function to del tasks", user_id, task_id)
  fetch(`http://127.0.0.1:5000/changeStatus/${user_id}/${task_id}`)
  .then(() => {
    fetch(`http://127.0.0.1:5000/getTasks/1`)
    .then((response) => response.json())
    .then((data) => setUserTasks(data))
  })
  .catch((error) => console.error(error))
}

//-------------------------------------------------------------

//ADD TASK
function addTask(user_id, description){
  console.log(Object.keys(description).length)
if(Object.keys(description).length <= 0 || Object.keys(description).length > 1250){
  console.log("Write your task")
}else{
    // console.log("add tareas", user_id, description)
    fetch(`http://127.0.0.1:5000/addTask/${user_id}/${description}`)
    .then(() => {
      fetch(`http://127.0.0.1:5000/getTasks/1`)
      .then((response) => response.json())
      .then((data) => setUserTasks(data))
    })
    .catch((error) => console.error(error))
    setModalVisible(false)
  }
}

//-------------------------------------------------------------

//LOGOUT FUNCTION
function LogOut(){
  eventEmitter.emit('logout')
}


//-------------------------------------------------------------

  //ESTRUCTURA Y RETORNO DE HOMESCREEN
  return (
    <ImageBackground style={Styles.backgroundImage} source={require('../assets/backLogin.jpg')}>
      <View style={Styles.container}>
        <View style={Styles.Header}>
          <Image style={Styles.AppName} source={require('../assets/WorkDone.png')}/>
          <Icon name="sign-out" style={Styles.IconLogOut} onPress={LogOut} />
        </View>

        <ScrollView style={Styles.taskContainer}>
          {/* TAREAS */}
          {getTasks().map((task, index) => (
            <View key={index} style={[Styles.listas, { marginTop: 10 }]}>
              <TouchableOpacity style={Styles.ListDescription}>
                <Text style={{color:'white'}}>{task[0]}</Text>
              </TouchableOpacity>

              {/* // ESTATUS DE LA TAREA */}
              <TouchableOpacity  style={Styles.ListStatus} onPress={() => changeStatus(task[2],task[3])}>
                {task[1] === 0 ? (
                  <Icon name="square-o" style={[Styles.IconCheck,{color:'grey'}]}/>
                ) : (
                  <Icon name="check-square" style={[Styles.IconCheck,{color:'green'}]}/>
                )}
              </TouchableOpacity>

              {/* //BOTONES DE DELETE */}
              <TouchableOpacity
                style={Styles.ListStatus}
                onPress={() =>{ setWindowDel(true); setData1(task[2]);setData2(task[3])}}>
                <Icon name="trash" style={Styles.IconTrash} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        
        {/* //Boton para agregar tareas */}
        <TouchableOpacity style={Styles.IconAddTasksContainer} onPress={() =>{setModalVisible(true)}}>
          <Icon name="plus" style={Styles.IconAddTasks} />
        </TouchableOpacity>

        {/* Ventana emergente para agregar tarea */}
          <Modal visible={modalVisible} transparent={true}>
          <View style={Styles.Modalback}>
            <View style={Styles.Boxaddtask}>
              <View style={Styles.boxBtn}>
                <TouchableOpacity style={Styles.btnaddtask} onPress={()=>{addTask(1,newTaskText);setNewTaskText("");}}>
                  <Text style={[{color:'white'},{margin:'auto'}]}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.btnaddtask} onPress ={()=>{setModalVisible(false)}}>
                  <Text style={[{color:'white'},{margin:'auto'}]}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <TextInput multiline={true} 
              placeholder='Text here' 
              placeholderTextColor={'rgba(255, 255, 255, 0.4)'} 
              underlineColorAndroid="transparent" value={newTaskText} 
              onChangeText={setNewTaskText}
              style={Styles.BoxTxt}/>
            </View>
          </View>
          </Modal>
        {/* Ventana de confirmacion para delete de tarea */}
          <Modal visible={askDelete} transparent={true}>
            <View style={Styles.Modalback}>
              <View  style={Styles.DelContainer}>
                <Text style={[{color:'white'},{marginBottom:20}]}>Confirm Delete?</Text>
                <View style={Styles.iconsDelete}>
                  <TouchableOpacity style={Styles.touchdelicon} onPress={ ()=>{delTask(); }}>
                    <Icon name="check" style={[Styles.delIcons,{color:"green"}]}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.touchdelicon} onPress={()=>{setWindowDel(false)}}>
                    <Icon name="times" style={[Styles.delIcons,{color:"red"}]}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
      </View>
    </ImageBackground>
  );
};

//-------------------------------------------------------------

//EXPORTAR HOMESCREEN
export default HomeScreen;
