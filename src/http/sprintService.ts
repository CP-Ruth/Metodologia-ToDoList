import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ITarea } from "../types/ITarea";

const API_URL = "http://localhost:3000/sprintList";

export const getListaSrintApi = async (): Promise<ISprint[]> => {
    try {
        const response = await axios.get<ISprint[]>(API_URL); // Petición directa a /backlog
        return response.data// Accede al array de tareas del backlog
    } catch (error) {
        console.error("Error al obtener los sprint:", error);
        throw error;
    }
}

// Función para agregar un nuevo sprint
export const addSprintApi = async (newSprint: Omit<ISprint, 'id'>) => {
    try {
        const response = await axios.post<ISprint>(API_URL, newSprint);
        return response.data;
    } catch (error) {
        console.error("Error al añadir un sprint:", error);
        throw error;
    }
}

// Función para actualizar un sprint existente
export const editSprintgApi = async (sprintId: string, updatedSprint: ISprint) => {
    try {
        const response = await axios.put<ISprint>(`${API_URL}/${sprintId}`, updatedSprint);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar sprint (id: ${sprintId}) :`, error);
        throw error;
    }
}


// Función para eliminar un sprint
export const deleteSprintApi = async (sprintId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${sprintId}`);
        return response
    } catch (error) {
        console.error(`Error al eliminar sprint (id: ${sprintId}):`, error);
        throw error;
    }
};

/**--------------------------------------------------------------------------------- */

// Función para obtener las tareas de un sprint específico
export const getTareasSprintApi = async (sprintId: string): Promise<ITarea[]> => {
    try {
        const response = await axios.get<ISprint>(`${API_URL}/${sprintId}`);
        return response.data.tareas;
    } catch (error) {
        console.error(`Error al obtener las tareas del sprint (id: ${sprintId}):`, error);
        throw error;
    }
};

// Función para agregar una tarea a un sprint específico

// Función para editar una tarea de un sprint específico    

// Función para eliminar una tarea de un sprint específico

// Función para editar el estado de una tarea de un sprint específico
