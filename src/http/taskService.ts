import axios from "axios";
import { ITarea } from "../types/ITarea";

const API_URL = "http://localhost:3000/backlog";


// funcion para obtener una tareas del backlog
export const getTareasBacklogApi = async (): Promise<ITarea[]>=> {
  try {
    const response = await axios.get<{ tareas: ITarea[] }>(API_URL);
        return response.data.tareas;
  } catch (error) {
    console.error("Error al añadir una tarea al backlog:", error);
    throw error; 
  }
}

// Añadir una tarea al backlog
export const addTareaBacklogApi = async (newTarea: ITarea) => {
  try {
      // Obtener las tareas actuales
      const { data: backlog } = await axios.get<{ tareas: ITarea[] }>(API_URL);

      // Agregar nueva tarea
      const updatedTareas = [...backlog.tareas, newTarea];

      // Actualizar el array de tareas
      const response = await axios.put(API_URL, { tareas: updatedTareas });
      return response.data;
  } catch (error) {
      console.error("Error al añadir tarea al backlog:", error);
      throw error;
  }
};

// Editar una tarea del backlog
export const editTareaBacklogApi = async (updatedTarea: ITarea) => {
  try {
      const { data: backlog } = await axios.get<{ tareas: ITarea[] }>(API_URL);

      const updatedTareas = backlog.tareas.map((tarea) =>
          tarea.id === updatedTarea.id ? updatedTarea : tarea
      );

      const response = await axios.put(API_URL, { tareas: updatedTareas });
      return response.data;
  } catch (error) {
      console.error("Error al editar tarea del backlog:", error);
      throw error;
  }
};

// Eliminar una tarea del backlog
export const deleteTareaDelBacklogApi = async (id: string) => {
  try {
      const { data: backlog } = await axios.get<{ tareas: ITarea[] }>(API_URL);

      const updatedTareas = backlog.tareas.filter((tarea) => tarea.id !== id);

      await axios.put(API_URL, { tareas: updatedTareas });
  } catch (error) {
      console.error("Error al eliminar tarea del backlog:", error);
      throw error;
  }
};

