import { FC, ReactNode } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./ItemTareaBacklog.module.css"

interface ItemTarea {
    tarea: ITarea;
    //children: ReactNode;
}

export const ItemTareaBacklog: FC<ItemTarea> = ({ tarea/*, children*/ }) => {
    return (
        <div className={style.ContainerItemTareaBacklog}>
            <div>
                <h4>{tarea.titulo}</h4>
                <p>Fecha límite:{tarea.fechaLimite}</p>
            </div>
            
            <div>
                <button>Ver</button>
                <button>Editar</button>
                <button>Elim</button>
            </div>
        </div>
    )

}