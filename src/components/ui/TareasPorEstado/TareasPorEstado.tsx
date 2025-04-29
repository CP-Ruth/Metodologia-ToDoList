import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./TareasPorEstado.module.css"
import { ItemTarea } from "../ItemTarea/ItemTarea";
import { ISprint } from "../../../types/ISprint";

interface Estado {
    sprint: ISprint;
    tareas: ITarea[];
    estadoTarea: "pendiente" | "en_progreso" | "completada";
}

const titulo = {
    pendiente: "Pendientes",
    en_progreso: "En progreso",
    completada: "Completada"
}

export const TareasPorEstado: FC<Estado> = ({ sprint, tareas, estadoTarea }) => {



    return (
        <div className={style.columnaEstado}>
            <h3>{titulo[estadoTarea]}</h3>
            {tareas.length > 0 ? (
                tareas.map((tarea) =>
                    <ItemTarea
                        key={tarea.id}
                        tarea={tarea}
                        sprintId={sprint.id}
                                            />
                )

            ) : (<p>No hay tareas {titulo[estadoTarea].toLowerCase()}</p>)}
    
        </div>
    )
}
