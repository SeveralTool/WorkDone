import { useState, useEffect } from "react";

//TRAER MIS TAREAS Y ESTATUS
export const useUserTasks = () => {
    const [UserTasks, setUserTasks] = useState([]);
  
    useEffect(() => {
      fetch(`http://127.0.0.1:5000/getTasks/1`)
        .then((response) => response.json())
        .then((data) => setUserTasks(data))
        .catch((error) => console.error(error));
    }, []);
  
    return [UserTasks, setUserTasks];
  };



export default useUserTasks

