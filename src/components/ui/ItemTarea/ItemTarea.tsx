import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./ItemTarea.module.css"
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { ISprint } from "../../../types/ISprint";
import { useTareas } from "../../../hooks/useTareas";

interface ItemTarea {
    tarea: ITarea;
    sprints?: ISprint[];
    ver: (tarea: ITarea) => void;
    editar: (tarea: ITarea) => void;
    eliminar: (id: string) => void;
    enviarBacklog?: (tarea: ITarea) => void;
    cambiarEstado?: (tarea: ITarea) => void;
}


export const ItemTarea: FC<ItemTarea> = ({
    tarea,
    sprints,
    ver,
    editar,
    eliminar,
    enviarBacklog,
    cambiarEstado
}) => {

    const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
    const {moverTareaAUnSprint} = useTareas();
    const handleSelectSprint = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSprint(event.target.value); // Guardamos el sprint seleccionado
    }

    const handleEnviarSprint =() => {
        if (selectedSprint) {
            moverTareaAUnSprint(tarea,selectedSprint );
        }
    }

    return (
        <div className={style.ContainerItemTareaBacklog}>
            <div>
                <h4>{tarea.titulo}</h4>
                <p>Fecha límite:{tarea.fechaLimite}</p>
            </div>

            <div className={style.buttonsAndSelect}>
                {sprints && (
                    <div className={style.sendSprint}>
                        <select onChange={handleSelectSprint} value={selectedSprint || ''}>
                            <option value="">Seleccionar Sprint</option>
                            {sprints.map((sp) => (<option key={sp.id} value={sp.id}>{sp.nombre}</option>))}
                        </select>
                        <button className={style.sendButton}
                            onClick={handleEnviarSprint}
                            disabled={!selectedSprint}
                        >
                            Enviar
                        </button>
                    </div>

                )}
                <button onClick={() => ver(tarea)} style={{ backgroundColor: "#6BB0FF", color: "white", border: "none" }}><IoEyeSharp /></button>
                <button onClick={() => editar(tarea)} style={{ backgroundColor: "#85C86D", color: "white", border: "none" }}><FaPen /></button>
                <button onClick={() => eliminar(tarea.id!)} style={{ backgroundColor: "#FF6B6B", color: "white", border: "none" }}><FaTrashAlt /></button>
            </div>
            <div>
                {enviarBacklog && (
                    <button className={style.sendBacklog} onClick={() => enviarBacklog(tarea)}>
                        Enviar al Backlog
                    </button>
                )}
                {cambiarEstado && (
                    <button className={style.changeState} onClick={() => cambiarEstado(tarea)}>
                        Cambiar estado
                    </button>
                )}
            </div>
        </div>

    )

}