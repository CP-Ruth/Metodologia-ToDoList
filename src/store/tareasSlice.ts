import { create } from "zustand";
import { ITarea } from "../types/ITarea";

export interface IBacklogTareasSlice {
    backlogTareas: ITarea[];
    activeTarea: ITarea | null;
    setAllTarea: (allTarea: ITarea[]) => void;
    addTareaAlBacklog: (newTarea: ITarea) => void;
    editTareaDelBacklog: (updatedTarea: ITarea) => void;
    deleteTareaDelBacklog: (idTarea: string) => void;
}

export const storeBacklogTareasSlice = create<IBacklogTareasSlice>((set) => ({
    backlogTareas: [],
    activeTarea: null,
    
    setAllTarea: (allTarea) => {
        set({ backlogTareas: allTarea });
    },

    //Añadir una tarea 
    addTareaAlBacklog: (newTarea) =>{
        set((state) => ({ backlogTareas: [...state.backlogTareas, newTarea] }));
    },
    
    //Edita runa tarea
    editTareaDelBacklog: (updatedTarea) => {
        set((state) => ({
            backlogTareas: state.backlogTareas.map((tarea) => tarea.id === updatedTarea.id ? updatedTarea : tarea)
        }));
    },

    //Eliminar tarea
    deleteTareaDelBacklog: async (idTarea) => {
        set((state) => ({
            backlogTareas: state.backlogTareas.filter((tarea) => tarea.id !== idTarea)
        }))
        }
})
)

