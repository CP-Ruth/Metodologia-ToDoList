import { storeSprintSlice } from "../store/sprintSlice";
import { v4 as uuidv4 } from 'uuid';
import { addSprintApi, addTareaAlSprintApi, deleteSprintApi, editSprintApi, editTareaSprintApi, getListaSprintApi, removeTareaDelSprintApi, getSprintById } from "../http/sprintService";
import { ISprint } from "../types/ISprint";
import { storeBacklogTareasSlice } from "../store/tareasSlice";
import { addTareaBacklogApi } from "../http/taskService";
import { ITarea } from "../types/ITarea";

export const useSprints = () => {
    const {
        listaSprints,
        setAllSprint,
        addSprint,
        editSprint,
        deleteSprint,
        addTareaAlSprint,
        removeTareaDelSprint,
    } = storeSprintSlice();

    const {
        addTareaAlBacklog
    } = storeBacklogTareasSlice();

    const getTodosLosSprint = async () => {
        try {
            const todosLosSprint = await getListaSprintApi();
            if (todosLosSprint) { setAllSprint(todosLosSprint); }
        } catch (error) {
            console.error("Error al obtener los sprints:", error);
        }
    };

    const getSprintPorId = async (idSprint: string) => {
        try {
            const sprint = await getSprintById(idSprint);
            return sprint
        } catch (error) {
            console.error("Error al obtener el sprint:", error);
        }
    }


    const crearSprint = async (newSprint: ISprint) => {
        try {
            const idNuevo = uuidv4();
            const newSprintConId = {...newSprint, id: idNuevo}
            const añadirSprint = await addSprintApi(newSprintConId);
            if (añadirSprint) { addSprint(añadirSprint) }
        } catch (error) {
            console.error('Error al agregar un sprint:', error);
        }
    };

    const modificarSprint = async (sprint: ISprint) => {
        try {
            const editarSprint = await editSprintApi(sprint.id!, sprint);
            if (editarSprint) { editSprint(editarSprint) }
        } catch (error) {
            console.error('Error al editar el sprint:', error);
        }
    };

    const eliminarSprint = async (idSprint: string) => {
        try {
            await deleteSprintApi(idSprint);
            deleteSprint(idSprint);
        } catch (error) {
            console.error('Error al eliminar el sprint:', error);
        }
    };

    const añadirTareaAlSprint = async (idSprint: string, tarea: ITarea) => {
        const idNuevo = uuidv4();
        const newTareaConId = {...tarea, id: idNuevo};
        try {
            await addTareaAlSprintApi(idSprint, newTareaConId);
            addTareaAlSprint(idSprint, newTareaConId);
        } catch (error) {
            console.error('Error al agregar tarea al sprint:', error);
        }
    };

    const modificarTareaDelSprint = async (sprintId: string, updatedTarea: ITarea) => {
        try {
            const editSprintTarea = await editTareaSprintApi(sprintId, updatedTarea);
            if (editSprintTarea) { editSprint(editSprintTarea) }
        } catch (error) {
            console.error('Error al editar tarea del sprint:', error);
        }
    }

    const eliminarTareaDelSprint = async (idSprint: string, idTarea: string) => {
        try {

            await removeTareaDelSprintApi(idSprint, idTarea);
            removeTareaDelSprint(idSprint, idTarea);
        } catch (error) {
            console.error('Error al remover tarea del sprint:', error);
        }
    };

    // Añado tarea al backlog  y despues lo elimino del sprint
    const moverTareaAlBacklog = async (tarea: ITarea, sprintId: string) => {
        try {
            // añadimos al backlog
            await addTareaBacklogApi(tarea);
            addTareaAlBacklog(tarea);
            //eliminamos del sprint
            await removeTareaDelSprintApi(sprintId, tarea.id!);
            removeTareaDelSprint(sprintId, tarea.id!);
        } catch (error) {
            console.error("Error al mover tarea al backlog:", error);
        }
    };

    return {
        listaSprints,
        getTodosLosSprint,
        getSprintPorId,
        crearSprint,
        modificarSprint,
        eliminarSprint,
        añadirTareaAlSprint,
        modificarTareaDelSprint,
        eliminarTareaDelSprint,
        moverTareaAlBacklog
    }
}
