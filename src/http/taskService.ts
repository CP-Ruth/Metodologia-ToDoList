import axios from "axios";
import { IBacklog, ITarea } from "../types/ITarea";
import { ISpringLista } from "../types/ISpring";

const API_URL = "http://localhost:3000";

export const getBacklogTareas = async (): Promise<ITarea[]> => {
  try {
    const response = await axios.get<IBacklog>(`${API_URL}/backlog`); // Petición directa a /backlog
    return response.data.tareas;// Accede al array de tareas del backlog
  } catch (error) {
    console.error("Error al obtener las tareas del backlog:", error);
    throw error;
  }
};

// Función para agregar una nueva tarea al backlog
export const addTareaAlBacklogApi = async(newTarea: Omit<ITarea, 'id'>) => {
  try {
    const response = await axios.post<ITarea>(`${API_URL}/backlog/tareas`, newTarea);
    return response.data;    
  } catch (error) {
    console.error("Error al añadir una tarea al backlog:", error);
    throw error;
  }
}

// Función para actualizar una tarea existente en el backlog
export const editTareaDelBacklogApi = async(taskId: string, updatedTarea: ITarea) =>{
  try {
    const response = await axios.put<ITarea>(`${API_URL}/backlog/tareas/${taskId}`, updatedTarea);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar una tarea (id: ${taskId}) del backlog:`, error);
    throw error;
  }
}

// Función para eliminar una tarea del backlog
export const deleteTareaDelBacklogApi = async (taskId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/backlog/tareas/${taskId}`);
    return response
  } catch (error) {
    console.error(`Error al eliminar una tarea (id: ${taskId}) del backlog:`, error);
    throw error;
  }
};



/*-----------------------------------------------------------------*/
export const getSpringsLista = async () => {
  try {
    const response = await axios.get<ISpringLista>(`${API_URL}/sprintList`);
    return response.data.springs; // Accede al array de prings
  } catch (error) {
    console.error("Error al obtener los springs:", error);
  }
};
