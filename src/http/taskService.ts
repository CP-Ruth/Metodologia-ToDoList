import axios from "axios";
import { ITarea } from "../types/ITarea";

const API_URLT = "http://localhost:3000/tasks";


// funcion para obtener una tarea por id
export const getTaskByIdApi = async (idTarea:string) => {
  try {
    const response = await axios.get<ITarea>(`${API_URLT}/${idTarea}`);
    return response.data;
  } catch (error) {
    console.error("Error al añadir una tarea al backlog:", error);
  }
}

// Función para agregar una nueva tarea 
export const crearTareaApi = async(newTarea:ITarea) => {
  try {
    //Creo la tarea en Tasks
    const response = await axios.post<ITarea>(API_URLT, newTarea);
    return response.data;    
  } catch (error) {
    
    throw error;
  }
}

// Función para actualizar una tarea existente 
export const editTareaApi = async(taskId: string, updatedTarea: ITarea) =>{
  try {
    const response = await axios.put<ITarea>(`${API_URLT}/${taskId}`, updatedTarea);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar una tarea (id: ${taskId}) del backlog:`, error);
    throw error;
  }
}

// Función para eliminar una tarea 
export const deleteTareaApi = async (taskId: string) => {
  try {
    const response = await axios.delete(`${API_URLT}/${taskId}`);
    return response
  } catch (error) {
    console.error(`Error al eliminar una tarea (id: ${taskId}) del backlog:`, error);
    throw error;
  }
};


