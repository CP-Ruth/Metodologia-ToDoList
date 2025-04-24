import { useShallow } from "zustand/shallow"
import { storeSprintListaSlice } from "../store/sprintSlice"
import { addSprintApi, addTaskToSprintApi, deleteSprintApi, editSprintgApi, getListaSrintApi, removeTaskFromSprintApi } from "../http/sprintService";
import { ISprint } from "../types/ISprint";
import { storeBacklogTareasSlice } from "../store/tareasSlice";
import { addTareaAlBacklogApi } from "../http/taskService";

export const useSprints = () => {
    const {
        listaSprints,
        setAllSprint,
        addSprint,
        editSprint,
        deleteSprint,
        //setAllTareasSprint
    } = storeSprintListaSlice(useShallow((state) => ({ ...state })));

    const {
        backlogTareas,
        addTareaAlBacklog,
        deleteTareaDelBacklog
    } = storeBacklogTareasSlice(useShallow((state) => ({ ...state })));

    const getTodosLosSprint = async () => {
        try {
            const todosLosSprint = await getListaSrintApi();
            if (todosLosSprint) { setAllSprint(todosLosSprint); }
        } catch (error) {
            console.error("Error al obtener sprint:", error);
        }
    };

    const crearSprint = async (newSprint: ISprint) => {
        try {
            const añadirSprint = await addSprintApi(newSprint);
            if (añadirSprint) { addSprint(añadirSprint) }
        } catch (error) {
            console.error('Error al agregar un sprint:', error);
        }
    };

    const modificarSprint = async (sprint: ISprint) => {
        try {
            const editarSprint = await editSprintgApi(sprint._id!, sprint);
            if(editarSprint){ editSprint(editarSprint)}
        } catch (error) {
            console.error('Error al editar el sprint:', error);
        }
    };

    const eliminarSprint = async (idSprint:string) => {
        try {
            await deleteSprintApi(idSprint);
            deleteSprint(idSprint);
        } catch (error) {
            console.error('Error al eliminar el sprint:', error);
        }
    };

    const getSprintById = (id: string) => {
        const sprint = listaSprints.find((sprint) => sprint._id === id); 
        if (!sprint) {
            throw new Error(`Sprint con ID ${id} no encontrado.`);
        }
        return sprint;
    }

    const addTareaAlSprint = async (idSprint: string , idTarea: string) => {
        try {
            const sprintActualizado = await addTaskToSprintApi(idSprint,idTarea);
            if(sprintActualizado){
                editSprint(sprintActualizado);
                deleteTareaDelBacklog(idTarea);
            }
        } catch (error) {
            console.error('Error al agregar tarea al sprint:', error);
        }
    };

    const removeTareaDelSprint = async (idSprint: string , idTarea: string) => {
        try {
            
            const sprintActualizado = await removeTaskFromSprintApi(idSprint,idTarea);
            if(sprintActualizado){
                editSprint(sprintActualizado);
                addTareaAlBacklogApi();
            }
        } catch (error) {
            console.error('Error al remover tarea del sprint:', error);
        }
    }
    return {
        listaSprints,
        getTodosLosSprint,
        crearSprint,
        modificarSprint,
        eliminarSprint,
        getSprintById,
        addTareaAlSprint,
        removeTareaDelSprint
    }
}
