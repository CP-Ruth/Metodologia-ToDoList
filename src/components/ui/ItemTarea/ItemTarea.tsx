import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./ItemTarea.module.css"
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

interface ItemTarea {
    tarea: ITarea;
    ver: (tarea: ITarea) => void;
    editar: (tarea: ITarea) => void;
    eliminar: (id: string) => void;
    enviarSprint?: (tarea: ITarea) => void;
    enviarBacklog?: (tarea: ITarea) => void;
    cambiarEstado?: (tarea: ITarea) => void;
}


export const ItemTarea: FC<ItemTarea> = ({
    tarea,
    ver,
    editar,
    eliminar,
    enviarSprint,
    enviarBacklog,
    cambiarEstado
}) => {


    return (
        <div className={style.ContainerItemTareaBacklog}>
            <div>
                <h4>{tarea.titulo}</h4>
                <p>Fecha límite:{tarea.fechaLimite}</p>
            </div>

            <div className={style.buttonsAndSelect}>
                {enviarSprint && (
                    <button className={style.sendSprint} onClick={() => enviarSprint(tarea)}>
                        Enviar
                    </button>
                )}
                <button onClick={()=> ver(tarea)} style={{ backgroundColor: "#6BB0FF", color: "white", border: "none" }}><IoEyeSharp /></button>
                <button onClick={()=> editar(tarea)} style={{ backgroundColor: "#85C86D", color: "white", border: "none" }}><FaPen /></button>
                <button onClick={()=> eliminar(tarea._id!)} style={{ backgroundColor: "#FF6B6B", color: "white", border: "none" }}><FaTrashAlt /></button>
            </div>
            <div>
                {enviarBacklog && (
                    <button className={style.sendBacklog} onClick={() => enviarBacklog(tarea)}>
                    Enviar al Backlog
                </button>
                )}
                {cambiarEstado && (
                    <button className={style.changeState} onClick={() => cambiarEstado(tarea)}>
                    Enviar
                </button>
                )}
            </div>
        </div>

    )

}