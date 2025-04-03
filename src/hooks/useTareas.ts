import { useShallow } from "zustand/shallow";
import { addTareaAlBacklogApi, deleteTareaDelBacklogApi, editTareaDelBacklogApi, getBacklogTareas } from "../http/taskService";
import { ITarea } from "../types/ITarea";
import { storeBacklogTareasSlice } from "../store/backlogTareasSlice";

export const useTareas = () => {
     const {
          backlogTareas,
          setAllTarea,
          addTareaAlBacklog,
          editTareaDelBacklog,
          deleteTareaDelBacklog,
         // moverTareaASpring,
     } = storeBacklogTareasSlice(useShallow((state) => ({ ...state })));

     const getTodasTareasBacklog = async () => {
          try {
               const todasTareas = await getBacklogTareas();
               if (todasTareas) { setAllTarea(todasTareas); }
          } catch (error) {
               console.error("Error al obtener tareas del backlog:", error);
          }
     };

     const crearTareaParaBacklog = async (newTarea: ITarea) => {
          try {
               const añadirTarea = await addTareaAlBacklogApi(newTarea);
               if (añadirTarea) { addTareaAlBacklog(newTarea) }
          } catch (error) {
               console.error('Error al agregar una tarea al backlog:', error);
          }
     };

     const modificarTareaDelBacklog = async (tarea: ITarea) => {
          try {
               const editarTarea = await editTareaDelBacklogApi(tarea.id, tarea);
               if (editarTarea) { editTareaDelBacklog(tarea) }
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


     return {
          backlogTareas,
          getTodasTareasBacklog,
          crearTareaParaBacklog,
          modificarTareaDelBacklog,
          eliminarTareaDelBacklog
     };
};
