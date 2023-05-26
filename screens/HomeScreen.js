import SeeMore from 'react-native-see-more-inline';
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, ScrollView, Image
    , PanResponder, Animated } from "react-native";
// import { useUserTasks } from '../API/requests';
// import { useDelTasks } from '../API/deleteTask';
// import { useChangeStatus } from '../API/changeStatus';
import {tasks} from '../API/database'
import Styles from "../styles/styles1";
import Icon from "react-native-vector-icons/FontAwesome";

// CREAR LA HOMESCREEN
const HomeScreen = () => {
  // const [UserTasks, setUserTasks] = useUserTasks();
  const [refresh, setRefresh] = useState(false);
  // const [delTasks, setDelTasks] = useDelTasks();
  // const [changeStatus, setChangeStatus] = useChangeStatus(); // Obtener el hook useChangeStatus
//   const handleDeleteTask = (deluser_id, deltask_id) => {
//     console.log(deluser_id, deltask_id);
//     setDelTasks(deluser_id, deltask_id); // Llamar a la función setDelTasks en lugar de useDelTasks
//     setRefresh(!refresh);
//   };

// // FUNCION PARA MAEJAR EL CHANGE STATUS Y MANDARLA A BACKEND
//   const handleChangeStatus = (user_id, task_id) => {
//     console.log("Accion de cambiar estado", user_id, task_id); //Aqui muestra correctamente los parametros
//     setChangeStatus(user_id, task_id); //Aqui pasa los parametros undefined
//     setRefresh(!refresh);
//   };

const deleteTask = (task_id) =>{
  {console.log(task_id)}
  const delTask = tasks.filter(task => task.id !== task.id)
  setdeleteTask(delTask)
}

const changeStatus = (task_id, task_status) =>{
  {console.log(task_id, task_status)}
}
  //ESTRUCTURA Y RETORNO DE HOMESCREEN
  return (
    <View style={Styles.container}>
      <View style={Styles.Header}>
        <Image style={Styles.AppName} source={require('../assets/WorkDone.png')}/>
        <Icon name="sign-out" style={Styles.IconLogOut} />
      </View>

      <ScrollView style={{flex:1,}}>
        {/* TAREAS */}
        {tasks.map((task, index) => (
          <View key={index} style={[Styles.listas, { marginTop: 10 }]}>
            <TouchableOpacity style={Styles.ListDescription}>
              <Text style={{color:'white'}}>{task.description}</Text>
            </TouchableOpacity>

            {/* // ESTATUS DE LA TAREA */}
            <TouchableOpacity  style={Styles.ListStatus} onPress={() => changeStatus(task.id, task.status)}>
              {task.status === 0 ? (
                <Icon name="square-o" style={[Styles.IconCheck,{color:'grey'}]}/>
              ) : (
                <Icon name="check-square" style={[Styles.IconCheck,{color:'green'}]}/>
              )}
            </TouchableOpacity>

            {/* //BOTONES DE DELETE */}
            <TouchableOpacity
              style={Styles.ListStatus}
              onPress={() => deleteTask(task.id)}>
              <Icon name="trash" style={Styles.IconTrash} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* //Boton para agregar tareas */}
      <TouchableOpacity style={Styles.IconAddTasksContainer}>
        <Icon name="plus" style={Styles.IconAddTasks} />
      </TouchableOpacity>
    </View>
  );
};

//EXPORTAR HOMESCREEN
export default HomeScreen;
