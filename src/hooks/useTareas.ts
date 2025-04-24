import { ITarea } from "../types/ITarea";
import { v4 as uuidv4 } from 'uuid';

import { storeBacklogTareasSlice } from "../store/tareasSlice";
import { storeSprintSlice } from "../store/sprintSlice";
import { addTareaBacklogApi, deleteTareaDelBacklogApi, editTareaBacklogApi, getTareasBacklogApi } from "../http/taskService";
import { addTareaAlSprintApi } from "../http/sprintService";

export const useTareas = () => {
     const {
          backlogTareas,
          setAllTarea,
          addTareaAlBacklog,
          editTareaDelBacklog,
          deleteTareaDelBacklog,
     } = storeBacklogTareasSlice();

     const {
          addTareaAlSprint
     } = storeSprintSlice();

     const getTodasTareasBacklog = async () => {
          try {
               const todasTareas = await getTareasBacklogApi();
               setAllTarea(todasTareas); 
          } catch (error) {
               console.error("Error al obtener tareas del backlog:", error);
          }
     };

     const añadirTareaAlBacklog = async (newTarea: ITarea) => {
          try {
               const idNuevo = uuidv4();
               const newTareaConId = {...newTarea, id: idNuevo};
               const añadirTarea = await addTareaBacklogApi(newTareaConId);
               addTareaAlBacklog(añadirTarea) 
          } catch (error) {
               console.error('Error al agregar una tarea al backlog:', error);
          }
     };

     const modificarTareaDelBacklog = async (tarea: ITarea) => {
          try {
               const editarTarea = await editTareaBacklogApi(tarea);
               if (editarTarea) { editTareaDelBacklog(editarTarea) }
          } catch (error) {
               console.error('Error al editar tarea del backlog:', error);
          }
     };

     const eliminarTareaDelBacklog = async (idTarea:string)=>{
          try {
               await deleteTareaDelBacklogApi(idTarea);
               deleteTareaDelBacklog(idTarea)
          } catch (error) {
               console.error('Error al eliminar tarea del backlog:', error);
          }
     };

     // Añado tarea al sprint  y despues lo elimino del backlog
     const moverTareaAUnSprint = async (tarea: ITarea, idSprint: string) => {
          try {
               //añadimos al sprint
               await addTareaAlSprintApi(idSprint, tarea);
               addTareaAlSprint(idSprint, tarea);
               //eliminamos del backlog
               await deleteTareaDelBacklogApi(tarea.id!);
               deleteTareaDelBacklog(tarea.id!);
          } catch (error) {
               console.error("Error al mover tarea al sprint:", error);
          }
     }

     return {
          backlogTareas,
          getTodasTareasBacklog,
          añadirTareaAlBacklog,
          modificarTareaDelBacklog,
          eliminarTareaDelBacklog,
          moverTareaAUnSprint
     };
};
