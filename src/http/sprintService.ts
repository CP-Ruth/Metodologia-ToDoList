import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ITarea } from "../types/ITarea";

const API_URLS = "http://localhost:3000/sprintList";

// Obtener todos los sprints
export const getListaSprintApi = async (): Promise<ISprint[]> => {
    try {
        const response = await axios.get(API_URLS);
        return response.data.sprints;
    } catch (error) {
        console.error("Error al obtener los sprint:", error);
        throw error;
    }
}

// Obtener un sprint por ID
export const getSprintById = async (idSprint: string): Promise<ISprint> => {
    try {
        const response = await axios.get(API_URLS); // obtiene el objeto completo
        const sprintList = response.data.sprints;
        return sprintList.find((sp: ISprint) => sp.id === idSprint);
    } catch (error) {
        console.error("Error al obtener el sprint:", error);
        throw error;
    }
}

// Obtener las tareas de un sprint
export const getListaTareasSprintApi = async (idSprint: string): Promise<ITarea[]> => {
    try {
        const response = await axios.get<ISprint>(`${API_URLS}/${idSprint}`);
        return response.data.tareas;
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        throw error;
    }
}

// Agregar un nuevo sprint
export const addSprintApi = async (newSprint: Omit<ISprint, 'id'>): Promise<ISprint> => {
    try {
        //const response = await axios.post<ISprint>(`${API_URLS}/sprints`, newSprint);
        const response = await axios.get(API_URLS);
        const sprintList = response.data;

        //sprints: [ ]
        const updatedSprints = [...sprintList.sprints, newSprint];
        //acá actualizamos el objeto
        await axios.put(API_URLS, { ...sprintList, sprints: updatedSprints });
        return newSprint;
    } catch (error) {
        console.error("Error al añadir un sprint:", error);
        throw error;
    }
}

// Actualizar un sprint
export const editSprintApi = async (sprintId: string, updatedSprint: ISprint): Promise<ISprint> => {
    try {
        const response = await axios.get(API_URLS);
        const sprintList = response.data;

        const updatedSprints = sprintList.sprints.map((sprint: ISprint) => sprint.id === sprintId ? updatedSprint : sprint)

        await axios.put(API_URLS, { ...sprintList, sprints: updatedSprints });
        return updatedSprints;
    } catch (error) {
        console.error(`Error al actualizar sprint (id: ${sprintId}) :`, error);
        throw error;
    }
}

// Eliminar un sprint
export const deleteSprintApi = async (sprintId: string) => {
    try {
        const response = await axios.get(API_URLS);
        const sprintList = response.data;

        const updatedSprints = sprintList.sprints.filter((sp: ISprint) => sp.id !== sprintId);

        await axios.put(API_URLS, { ...sprintList, sprints: updatedSprints });

    } catch (error) {
        console.error(`Error al eliminar sprint (id: ${sprintId}):`, error);
        throw error;
    }
}

// Agregar una tarea a un sprint
export const addTareaAlSprintApi = async (sprintId: string, addTarea: ITarea) => {
    try {
        const response = await axios.get(API_URLS);
        const sprintList = response.data;

        const updatedSprints = sprintList.sprints.map(
            (sp: ISprint) => sp.id === sprintId ? { ...sp, tareas: [...sp.tareas, addTarea] } : sp
        )

        await axios.put(API_URLS, { ...sprintList, sprints: updatedSprints });

    } catch (error) {
        console.error(`Error al agregar tarea al sprint (id: ${sprintId}):`, error);
        throw error;
    }
};


// Editar una tarea del sprint
export const editTareaSprintApi = async (sprintId: string, updatedTarea: ITarea): Promise<ISprint> => {
    try {
        const response = await axios.get(API_URLS);
        const sprintList = response.data;

        const updatedSprints = sprintList.sprints.map(
            (sp: ISprint) => {
                if (sp.id === sprintId) {
                    const tareaEncontrada = sp.tareas.some(t => t.id === updatedTarea.id);
                    if (!tareaEncontrada) throw new Error("Tarea no encontrada en el sprint");

                    const updatedTareas = sp.tareas.map((t: ITarea) =>
                        t.id === updatedTarea.id ? { ...t, ...updatedTarea } : t
                    );
                    return { ...sp, tareas: updatedTareas };
                }
                return sp;
            }
        )

        const updatedSprintList = { ...sprintList, sprints: updatedSprints };

        await axios.put(API_URLS, updatedSprintList);

        const sprintActualizado = updatedSprintList.sprints.find((sp: ISprint) => sp.id === sprintId);
        if (!sprintActualizado) throw new Error("Sprint actualizado no encontrado");
        return sprintActualizado;
    } catch (error) {
        console.error("Error al editar tarea en el sprint:", error);
        throw error;
    }
};

// Remover una tarea de un sprint
export const removeTareaDelSprintApi = async (sprintId: string, taskId: string): Promise<ISprint> => {
    try {
        const response = await axios.get(API_URLS);
        const sprintList = response.data;

        const updatedSprints = sprintList.sprints.map(
            (sp: ISprint) => sp.id === sprintId ?
                {
                    ...sp, tareas: sp.tareas.filter(
                        (t: ITarea) => t.id !== taskId)
                } : sp
        )

        await axios.put(API_URLS, { ...sprintList, sprints: updatedSprints });
        return updatedSprints;

    } catch (error) {
        console.error(`Error al remover tarea del sprint (id: ${sprintId}):`, error);
        throw error;
    }
};
