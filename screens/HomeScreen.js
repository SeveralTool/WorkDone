import SeeMore from 'react-native-see-more-inline';
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, ScrollView, Image
    , PanResponder, Animated } from "react-native";
import { useUserTasks, useDelTasks, useChangeStatus } from '../API/requests';
import Styles from "../styles/styles1";
import Icon from "react-native-vector-icons/FontAwesome";

// CREAR LA HOMESCREEN
const HomeScreen = () => {
  const [UserTasks, setUserTasks] = useUserTasks();
  const [delTasks, setDelTasks] = useDelTasks();
  const [changeStatus, setChangeStatus] = useChangeStatus();
  const [refresh, setRefresh] = useState(false);


  const handleDeleteTask = (user_id, task_id) => {
    setDelTasks(user_id, task_id);
    setRefresh(!refresh)
  };
  const handleChangeStatus = (user_id, task_id) => {
    setChangeStatus(user_id, task_id);
    setRefresh(!refresh)
  };

  //CREACION DE LA ANIMACION PARA HJACER DELETE

  const [deleteIconOffset, setDeleteIconOffset] = useState(new Animated.Value(0));

  // Crear un gesto de arrastre utilizando PanResponder
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (event, gestureState) => {
      // Actualizar el valor de desplazamiento del ícono de la papelera
      setDeleteIconOffset(gestureState.dx);
    },
    onPanResponderRelease: () => {
      // Verificar si el ícono de la papelera ha sido arrastrado lo suficiente hacia la izquierda
      if (deleteIconOffset < -30) {
        // Realizar la acción de eliminación de la tarea
        // ...
        console.log("Accion de eliminar")
      }
      // Reiniciar el valor de desplazamiento del ícono de la papelera
      setDeleteIconOffset(0);
    },
  })


//ESTRUCTURA Y RETORNO DE HOMESCREEN
  return (
<View style={Styles.container}>

    <View style={Styles.Header}>
        <Image style={Styles.AppName} source={require('../assets/WorkDone.png')}/>
        <Icon name="sign-out" style={Styles.IconLogOut} />
    </View>

    <ScrollView style={{flex:1,}}>
        {/* TAREAS */}
        {UserTasks.map((task, index) => (
            <View key={index} style={[Styles.listas, { marginTop: 10 }]}>
                <TouchableOpacity style={Styles.ListDescription}>
                    <Text style={{color:'white'}}>{task[0]}</Text>
                </TouchableOpacity>

                {/* // ESTATUS DE LA TAREA */}
                <TouchableOpacity style={Styles.ListStatus}>
                    {task[1] === 0 ? (
                    <TouchableOpacity onPress={()=> handleChangeStatus(task[2], task[3])}>
                        <Icon name="square-o" style={[Styles.IconCheck,{color:'grey'}]}/>
                    </TouchableOpacity>
                    ) : (
                    <TouchableOpacity>
                        <Icon name="check-square" style={[Styles.IconCheck,{color:'green'}]}/>
                    </TouchableOpacity>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
            style={[Styles.ListStatus, { transform: [{ translateX: deleteIconOffset }]}]}
            {...panResponder.panHandlers}
                    onPress={() => handleDeleteTask(task[2], task[3])}>
                    <Animated.View>
                                <Icon name="trash" style={Styles.IconTrash} />
                    </Animated.View>
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

