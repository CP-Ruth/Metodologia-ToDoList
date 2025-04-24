import { create } from "zustand";
import { ITarea } from "../types/ITarea";

export interface ITareasSlice {
    tareas: ITarea[];
    activeTarea: ITarea | null;
    addTareaAlBacklog: (newTarea: ITarea) => void;
    setAllTarea: (allTarea: ITarea[]) => void;
    editTareaDelBacklog: (updatedTarea: ITarea) => void;
    deleteTareaDelBacklog: (idTarea: string) => void;
    moverTareaASpring: (idTarea: string, idSpring: string) => void;
}

export const storeTareasSlice = create<ITareasSlice>((set) => ({
    tareas: [],
    activeTarea: null,
    
    setAllTarea: (allTarea) => {
        set({ backlogTareas: allTarea });
    },

    //Crear una Tarea
    crearTarea: (newTarea) =>{
        set
    }

    //Edita runa tarea
    editTarea: (updatedTarea) => {
        set((state) => ({
            backlogTareas: state.backlogTareas.map((tarea) => tarea._id === updatedTarea._id ? updatedTarea : tarea)
        }));
    },
    
/* --------------------------------trabajamos el backlog--------------------------- */

    //Añadir una tarea 
    addTareaAlBacklog: (newTarea) =>{
        set((state) => ({ backlogTareas: [...state.backlogTareas, newTarea] }));
    },
    
    //Eliminar tarea
    deleteTareaDelBacklog: async (idTarea) => {
        set((state) => ({
            backlogTareas: state.backlogTareas.filter((tarea) => tarea._id !== idTarea)
        }))
        },


    moverTareaASpring: (idTarea, idSpring) => {
        set((state) => ({
            backlogTareas: state.backlogTareas.filter((tarea) => tarea._id !== idTarea),
        }));
        console.log(`Tarea con ID ${idTarea} movida al sprint con ID ${idSpring}`);
    }
    //Falta lógica para cambiar o actualizar las tareas de los springs

})
)

