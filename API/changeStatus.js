import { useState, useEffect } from "react";
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
  
  export default useChangeStatus