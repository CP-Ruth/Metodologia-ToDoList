import axios from "axios";
import { ITarea } from "../types/ITarea";

const API_URL = "http://localhost:3000/backlogTareas";

export const getBacklogTareas = async (): Promise<ITarea[]> => {
  try {
    const response = await axios.get<ITarea[]>(API_URL); // Petición directa a /backlog
    return response.data;// Accede al array de tareas del backlog
  } catch (error) {
    console.error("Error al obtener las tareas del backlog:", error);
    throw error;
  }
};

// Función para agregar una nueva tarea al backlog
export const addTareaAlBacklogApi = async(newTarea: Omit<ITarea, 'id'>) => {
  try {
    const response = await axios.post<ITarea>(API_URL, newTarea);
    return response.data;    
  } catch (error) {
    console.error("Error al añadir una tarea al backlog:", error);
    throw error;
  }
}

// Función para actualizar una tarea existente en el backlog
export const editTareaDelBacklogApi = async(taskId: string, updatedTarea: ITarea) =>{
  try {
    const response = await axios.put<ITarea>(`${API_URL}/${taskId}`, updatedTarea);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar una tarea (id: ${taskId}) del backlog:`, error);
    throw error;
  }
}

// Función para eliminar una tarea del backlog
export const deleteTareaDelBacklogApi = async (taskId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`);
    return response
  } catch (error) {
    console.error(`Error al eliminar una tarea (id: ${taskId}) del backlog:`, error);
    throw error;
  }
};

