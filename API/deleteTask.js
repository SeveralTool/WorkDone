import { useState, useEffect } from "react";

export const useDelTasks = (deluser_id, deltask_id) => {
  const [delTasks, setDelTasks] = useState([]);
  console.log("delete task backend")
  if (deluser_id !== undefined && deltask_id !== undefined) {
  useEffect(() => {
      fetch(`http://127.0.0.1:5000/deleteTask/${deluser_id}/${deltask_id}`, { method: 'DELETE' })
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
    
  }, [deluser_id, deltask_id]);
}
  return [delTasks, setDelTasks];
};

export default useDelTasks;
