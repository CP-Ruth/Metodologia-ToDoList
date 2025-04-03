import { create } from "zustand";
import { ITarea } from "../types/ITarea";

export interface IBacklogTareasSlice {
    backlogTareas: ITarea[];
    activeTarea: ITarea | null;
    addTareaAlBacklog: (newTarea: ITarea) => void;
    editTareaDelBacklog: (updatedTarea: ITarea) => void;
    deleteTareaDelBacklog: (idTarea: string) => void;
    setAllTarea: (allTarea: ITarea[]) => void;
    moverTareaASpring: (idTarea: string, idSpring: string) => void;
}

export const storeBacklogTareasSlice = create<IBacklogTareasSlice>((set) => ({
    backlogTareas: [],
    activeTarea: null,

    //Añadir una tarea 
    addTareaAlBacklog: (newTarea) =>
        set((state) => ({ backlogTareas: [...state.backlogTareas, newTarea] })),


    // addTareaAlBacklog: async (newTarea) => {
    //     try {
    //         const añadirTarea = await addTareaAlBacklogApi(newTarea);
    //         set((state) => ({ backlogTareas: [...state.backlogTareas, añadirTarea] }));
    //     } catch (error) {
    //         console.error('Error al agregar una tarea al backlog:', error);
    //     }

    // },

    //Editaruna tarea


    editTareaDelBacklog: (updatedTarea) => {
        set((state) => ({
            backlogTareas: state.backlogTareas.map((tarea) => tarea.id === updatedTarea.id ? updatedTarea : tarea)
        }));

        //    try {
        //        const editarTarea = await editTareaDelBacklogApi(updatedTarea.id, updatedTarea);
        //        set((state) => ({
        //          backlogTareas: state.backlogTareas.map((tarea) => tarea.id === editarTarea.id ? editarTarea : tarea)
        //        }));
        //    } catch (error) {
        //        console.error('Error al editar tarea del backlog:', error);
        //    }
    },

    //Eliminar tarea
    deleteTareaDelBacklog: async (idTarea) => {
        set((state) => ({
            backlogTareas: state.backlogTareas.filter((tarea) => tarea.id !== idTarea)
        }))
        // try {
        //     await deleteTareaDelBacklogApi(idTarea);
        //     set((state) => ({
        //         backlogTareas: state.backlogTareas.filter((tarea) => tarea.id !== idTarea)
        //     }))
        // } catch (error) {
        //     console.error('Error al eliminar tarea del backlog:', error);
        // }
    },

    setAllTarea: (allTarea) => {
        set({ backlogTareas: allTarea });

    },

    moverTareaASpring: (idTarea, idSpring) => {
        set((state) => ({
            backlogTareas: state.backlogTareas.filter((tarea) => tarea.id !== idTarea),
        }));
        console.log(`Tarea con ID ${idTarea} movida al sprint con ID ${idSpring}`);
    }
    //Falta lógica para cambiar o actualizar las tareas de los springs

})
)

