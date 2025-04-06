import axios from "axios";
import { ISprint, ISprintLista } from "../types/ISprint";

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
