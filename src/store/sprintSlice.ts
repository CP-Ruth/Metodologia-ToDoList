import { create } from "zustand";
import { ISprint } from "../types/ISprint";
import { ITarea } from "../types/ITarea";


export interface ISprintListaSlice {
    listaSprints: ISprint[];
    activeSprint: ISprint | null;
    setAllSprint: (allSprint: ISprint[]) => void;
    getSprint:(sprint:ISprint)=> void;
    addSprint: (newSprint: ISprint) => void;
    editSprint: (updatedSprint: ISprint) => void;
    deleteSprint: (idSprint: string) => void;
    addTareaAlSprint: (idSprint: string, newTarea: ITarea) => void;
    editTareaDelSprint: (idSprint: string, updatedTarea: ITarea) => void;
    removeTareaDelSprint: (idSprint: string, idTarea: string) => void;
}

export const storeSprintSlice = create<ISprintListaSlice>((set) => ({
    listaSprints: [],
    activeSprint: null,

    setAllSprint: (allSprint) => {
        set({ listaSprints: allSprint })
    },

    getSprint: (sprint) => {
        set({ activeSprint: sprint})
    },
    //Añadir un sprint
    addSprint: (newSprint) => {
        set((state) => ({ listaSprints: [...state.listaSprints, newSprint] }))
    },

    //Editar un sprint
    editSprint: (updatedSprint) => {
        set((state) => ({
            listaSprints: state.listaSprints.map((sprint) => sprint.id === updatedSprint.id ? updatedSprint : sprint)
        }));
    },

    //Eliminar un sprint
    deleteSprint: (idSprint) => {
        set((state) => ({
            listaSprints: state.listaSprints.filter((sprint) => sprint.id !== idSprint)
        }));
    },

    //Añadir una tarea al sprint(identificado por Id)
    addTareaAlSprint: (idSprint, newTarea) => {
        set((state) => ({
            listaSprints: state.listaSprints.map(
                (sprint) => sprint.id === idSprint ?
                    { ...sprint, tareas: [...sprint.tareas, newTarea] }
                    : sprint
            )
        })
        )
    },

    // Editar tarea del sprint(identificado por Id)
    editTareaDelSprint: (idSprint, updatedTarea) => {
        set((state) => ({
            listaSprints: state.listaSprints.map(
                (sprint) => sprint.id === idSprint ?
                    {
                        ...sprint, tareas: sprint.tareas.map((tarea) =>
                            tarea.id === updatedTarea.id ?
                                updatedTarea
                                : tarea
                        )
                    }
                    : sprint
            )
        }))
    },
    //remover tarea del sprint(identificado por Id)
    removeTareaDelSprint: (idSprint, idTarea) => {
        set((state) => ({
            listaSprints: state.listaSprints.map(
                (sprint) => sprint.id === idSprint ?
                    {
                        ...sprint, tareas: sprint.tareas.filter((tarea) => tarea.id !== idTarea)
                    }
                    : sprint
            )
        }))
    }


}))