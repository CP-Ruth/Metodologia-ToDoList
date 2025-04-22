import axios from "axios";
import { IBacklog, ITarea } from "../types/ITarea";

const API_URLB = "http://localhost:3000/backlog";
const API_URLT = "http://localhost:3000/tasks";

export const getBacklogTareas = async (): Promise<ITarea[]> => {
  try {
    const response = await axios.get<IBacklog>(API_URLB); // Petición directa a /backlog
    console.log(response.data.tareas)
    return response.data.tareas;// Accede al array de tareas del backlog
  } catch (error) {
    console.error("Error al obtener las tareas del backlog:", error);
    throw error;
  }
};

// Función para agregar una nueva tarea al backlog
export const addTareaAlBacklogApi = async(newTarea: Omit<ITarea, '_id'>) => {
  try {
    //Creo ta tarea en Tasks
    const nuevaTarea = await axios.post<ITarea>(API_URLT, newTarea);
    //Tomo el id de esa nueva tarea
    const tareaData = nuevaTarea.data;
    //Agregar a al backlog la nueva tarea
    const response = await axios.put(`${API_URLB}/add-task/${tareaData._id}`);
    return response.data;    
  } catch (error) {
    console.error("Error al añadir una tarea al backlog:", error);
    throw error;
  }
}

// Función para actualizar una tarea existente en el backlog
export const editTareaDelBacklogApi = async(taskId: string, updatedTarea: ITarea) =>{
  try {
    const response = await axios.put<ITarea>(`${API_URLT}/${taskId}`, updatedTarea);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar una tarea (id: ${taskId}) del backlog:`, error);
    throw error;
  }
}

// Función para eliminar una tarea del backlog
export const deleteTareaDelBacklogApi = async (taskId: string) => {
  try {
    const response = await axios.delete(`${API_URLT}/${taskId}`);
    return response
  } catch (error) {
    console.error(`Error al eliminar una tarea (id: ${taskId}) del backlog:`, error);
    throw error;
  }
};

