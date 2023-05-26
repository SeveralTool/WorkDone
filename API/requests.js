import { useState, useEffect } from "react";
///////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////

//HACER DELETE DE TAREAS
export const useDelTasks = (user_id, task_id) => {
  const [delTasks, setDelTasks] = useState([]);

  useEffect(() => {
    if (user_id !== undefined && task_id !== undefined) {
      fetch(`http://127.0.0.1:5000/deleteTask/${user_id}/${task_id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            setDelTasks("Task deleted successfully");
          } else {
            throw new Error("Failed to delete task");
          }
        })
        .catch((error) => {
          console.error(error);
          setDelTasks("Failed to delete task");
        });
    }
  }, [user_id, task_id]);

  return [delTasks, setDelTasks];
};
///////////////////////////////////////////////////////////////////


//CAMBIAR STATUS DE TAREAS
export const useChangeStatus = (user_id, task_id) => {
  const [changeStatus, setChangeStatus] = useState([]);
  console.log("change status backend", user_id, task_id)

  useEffect(() => {
    if (user_id !== undefined && task_id !== undefined) {
      fetch(`http://127.0.0.1:5000/changeStatus/${user_id}/${task_id}`)
        .then((response) => {
          if (response.ok) {
            setChangeStatus("Status update successfully");
          } else {
            throw new Error("Failed to change status");
          }
        })
        .catch((error) => {
          console.error(error);
          setChangeStatus("Failed");
        });
    }
  }, [user_id, task_id]);

  return [changeStatus, setChangeStatus];
};

export default {
  useUserTasks,
  useDelTasks,
  useChangeStatus,
};
