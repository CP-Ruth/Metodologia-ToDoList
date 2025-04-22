import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./ItemTareaBacklog.module.css"
import { IoArrowRedoOutline, IoEyeSharp } from "react-icons/io5";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useTareas } from "../../../hooks/useTareas";
interface ItemTarea {
    tarea: ITarea;
    handleOpenModalVer: (tarea: ITarea) => void;
    handleOpenModalEdit: (tarea: ITarea) => void;
    
}

export const ItemTareaBacklog: FC<ItemTarea> = ({ tarea, handleOpenModalVer, handleOpenModalEdit }) => {
    
    const { eliminarTareaDelBacklog } = useTareas();
    const eliminarTareaById = () => {
        eliminarTareaDelBacklog(tarea._id!)
    };
    
    const verTarea = () => {
        handleOpenModalVer(tarea)
    };

    const editarTarea = () => {
        handleOpenModalEdit(tarea);
    };

    return (
        <div className={style.ContainerItemTareaBacklog}>
            <div>
                <h4>{tarea.titulo}</h4>
                <p>Fecha límite:{tarea.fechaLimite}</p>
            </div>

            <div className={style.buttonsAndSelect}>
                <button className={style.sendSpring}>Enviar <IoArrowRedoOutline /></button>
                <button onClick={verTarea} style={{ backgroundColor: "#6BB0FF", color: "white", border: "none" }}><IoEyeSharp /></button>
                <button onClick={editarTarea} style={{ backgroundColor: "#85C86D", color: "white", border: "none" }}><FaPen /></button>
                <button onClick={eliminarTareaById} style={{ backgroundColor: "#FF6B6B", color: "white", border: "none" }}><FaTrashAlt /></button>
            </div>
        </div>
        
    )

}