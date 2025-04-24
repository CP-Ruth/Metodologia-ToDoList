import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./TareasPorEstado.module.css"
import { ItemTarea } from "../ItemTarea/ItemTarea";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";
import { ModalVer } from "../Modal/ModalVer/ModalVer";
import { useSprints } from "../../../hooks/useSprints";
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

    const [openModalVer, setOpenModalVer] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);
    const { moverTareaAlBacklog, modificarTareaDelSprint, eliminarTareaDelSprint } = useSprints();


    //click en ver abre el modal ver
    const handleOpenModalVer = (tarea: ITarea) => {
        setSelectedTarea(tarea);
        setOpenModalVer(true);
    }

    //click en editar abre el modal editar/añadir
    const handleOpenModalEdit = (tarea: ITarea) => {
        setSelectedTarea(tarea);
        setOpenModalEdit(true);
    }

    //click en enviarAlBacklog 
    const handleEnviarBacklog = (tarea: ITarea) => {
        if (!tarea.id) return;
        moverTareaAlBacklog(tarea, sprint.id!);
    };


    const handleCambiarEstado = (tarea: ITarea) => {
        if (!tarea.id) return;
        let nuevoEstado: ITarea["estado"] | null = null;

        if (tarea.estado === "pendiente") {
            nuevoEstado = "en_progreso";
        } else if (tarea.estado === "en_progreso") {
            nuevoEstado = "completada";
        } else {
            return;
        }
        const tareaActualizada: ITarea = {
            ...tarea,
            estado: nuevoEstado
        };

        modificarTareaDelSprint(sprint.id!, tareaActualizada);
    };

    const handleCloseModalEA = () => { setOpenModalEdit(false) };
    const handleCloseModalV = () => { setOpenModalVer(false) }

    return (
        <div className={style.columnaEstado}>
            <h3>{titulo[estadoTarea]}</h3>
            {tareas.length > 0 ? (
                tareas.map((tarea) =>
                    <ItemTarea
                        key={tarea.id}
                        tarea={tarea}
                        ver={handleOpenModalVer}
                        editar={handleOpenModalEdit}
                        eliminar={() => eliminarTareaDelSprint(sprint.id!, tarea.id!)}
                        enviarBacklog={handleEnviarBacklog}
                        cambiarEstado={()=> handleCambiarEstado(tarea)}
                    />
                )

            ) : (<p>No hay tareas {titulo[estadoTarea].toLowerCase()}</p>)}
            {openModalEdit && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalEA} />}
            {openModalVer && <ModalVer dataView={selectedTarea} handleCloseModal={handleCloseModalV} />}
        </div>
    )
}
