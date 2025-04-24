import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./TareasPorEstado.module.css"
import { ItemTarea } from "../ItemTarea/ItemTarea";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";
import { ModalVer } from "../Modal/ModalVer/ModalVer";
import { useTareas } from "../../../hooks/useTareas";

interface Estado {
    estadoTarea: "pendiente" | "en_progreso" | "completada";
    tareas: ITarea[];
}

const titulo = {
    pendiente: "Pendientes",
    en_progreso: "En progreso",
    completada: "Completada"
}

export const TareasPorEstado: FC<Estado> = ({ estadoTarea, tareas }) => {

    const tareasPorEstado = tareas.filter((tarea) => tarea.estado === estadoTarea);
    const [openModalVer, setOpenModalVer] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);
    const {eliminarTareaDelBacklog}= useTareas();
    
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

    //click en eliminar elimina la tarea
    //const handleElimar = ()=>{
      //  eliminarTareaDelBacklog()
    //}

    //click en enviarAlBacklog 
    const handleEnviarBacklog = (tarea: ITarea)=>{
        //falta logica
    }

    const handleCAmbiarEstado =  (tarea: ITarea)=>{
        //falta logica
    }

    const handleCloseModalEA = () => { setOpenModalEdit(false) };
    const handleCloseModalV = () => { setOpenModalVer(false) }

    return (
        <div className={style.columnaEstado}>
            <h3>{titulo[estadoTarea]}</h3>
            {tareasPorEstado.length > 0 ? (
                tareasPorEstado.map((tarea) =>
                    <ItemTarea
                    key={tarea.id}
                        tarea={tarea}
                        ver={handleOpenModalVer}
                        editar={handleOpenModalEdit}
                        eliminar={()=>eliminarTareaDelBacklog(tarea.id!)}
                        enviarBacklog={handleEnviarBacklog}
                        cambiarEstado={handleCAmbiarEstado}
                    />
                )

            ) : (<p>No hay tareas {titulo[estadoTarea].toLowerCase()}</p>)}
            {openModalEdit && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalEA} />}
                        {openModalVer && <ModalVer dataView={selectedTarea} handleCloseModal={handleCloseModalV} />}
        </div>
    )
}
