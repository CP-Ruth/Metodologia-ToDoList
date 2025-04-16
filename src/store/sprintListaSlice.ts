import { create } from "zustand";
import { ISprint } from "../types/ISprint";


export interface ISprintListaSlice {
    listaSprints: ISprint[];
    activeSprint: ISprint | null;
    setAllSprint: (allSprint: ISprint[]) => void;
    addSprint: (newSprint: ISprint) => void;
    editSprint: (updatedSprint: ISprint) => void;
    deleteSprint: (idSprint: string) => void;
    setAllTareasSprint:(allTareasSprint: ISprint) => void;
}

export const storeSprintListaSlice = create<ISprintListaSlice>((set)=>({
    listaSprints: [],
    activeSprint: null,

    setAllSprint: (allSprint) => {
        set({listaSprints: allSprint})
    },

    //Añadir un sprint
    addSprint: (newSprint) => {
        set((state)=>({listaSprints: [...state.listaSprints, newSprint]}))
    },

    //Editar un sprint
    editSprint: (updatedSprint) => {
        set((state) => ({
            listaSprints: state.listaSprints.map((sprint) => sprint.id === updatedSprint.id ? updatedSprint : sprint)
        }));
    },

    //Eliminar un sprint
    deleteSprint: async (idSprint) =>{
        set((state)=>({
            listaSprints: state.listaSprints.filter((sprint)=> sprint.id!==idSprint)
        }));
    },

    //Tareasd el sprint
    setAllTareasSprint: (allTareasSprint) => {
        set((state) => ({
            listaSprints: state.listaSprints.map((sprint) => {
                if (sprint.id === allTareasSprint.id) {
                    return { ...sprint, tareas: allTareasSprint.tareas };
                }
                return sprint;
            }),
        }));
    }
}))