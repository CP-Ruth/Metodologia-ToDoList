import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import style from "./ItemTarea.module.css"
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { ISprint } from "../../../types/ISprint";
import { useTareas } from "../../../hooks/useTareas";
import Swal from "sweetalert2";
import { useSprints } from "../../../hooks/useSprints";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";
import { ModalVer } from "../Modal/ModalVer/ModalVer";

interface ItemTarea {
    tarea: ITarea;
    sprints?: ISprint[];
    sprintId?: string
}


export const ItemTarea: FC<ItemTarea> = ({ tarea, sprints, sprintId }) => {

    const [openModalVer, setOpenModalVer] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);
    const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
    const { moverTareaAUnSprint, eliminarTareaDelBacklog } = useTareas();
    const { eliminarTareaDelSprint, moverTareaAlBacklog, modificarTareaDelSprint } = useSprints();
    const handleSelectSprint = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSprint(event.target.value); // Guardamos el sprint seleccionado
    }


    const handleEnviarSprint = () => {
        if (selectedSprint) {
            moverTareaAUnSprint(tarea, selectedSprint);
        }
    }

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

    //Cerramos los modales
    const handleCloseModalEA = () => { setOpenModalEdit(false) };
    const handleCloseModalV = () => { setOpenModalVer(false) }

    //click en eliminar 
    const handleEliminarTarea = async (tarea: ITarea) => {
        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la tarea definitivamente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        const idTarea = tarea.id;
        if (confirm.isConfirmed && idTarea) {

            if (sprintId) {
                await eliminarTareaDelSprint(sprintId, idTarea);
            } else {
                await eliminarTareaDelBacklog(idTarea)
            }

            Swal.fire("¡Eliminado!", "La tarea ha sido eliminada 🗑️", "success");
        }

    }

    const handleEnviarAlbacklog = (tarea: ITarea) => {
        if (sprintId) {
            //Reseteamos  el estado de la tarea
            const tareaActualizada: ITarea = {
                ...tarea,
                estado: "pendiente"
            };
            modificarTareaDelSprint(sprintId, tareaActualizada)
            moverTareaAlBacklog(tarea, sprintId);
        }
    }

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
        if (sprintId) {
            modificarTareaDelSprint(sprintId, tareaActualizada);
        }

    };

    //tarea próxima a vencer
    const tareaProximaAVencer = (fechaLimite: string): boolean => {
        const hoy = new Date();
        const fechaLimiteDate = new Date(fechaLimite);
        const diffTime = fechaLimiteDate.getTime() - hoy.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 3;
    };


    return (
        <div className={`${style.ContainerItemTarea} ${tareaProximaAVencer(tarea.fechaLimite) ? style.tareafechalimite : ''}`}>

            <div className={style.itemTareaPrincipal}>

                <div className={style.itemTareaInfo}>
                    <h4>{tarea.titulo}</h4>
                    <p>Fecha límite:{tarea.fechaLimite}</p>
                    <p className={`${tareaProximaAVencer(tarea.fechaLimite) ? style.textofechalimite : style.tareaNormal}`} >Tarea porxima a vencer</p>
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
                </div>
                <div className={style.buttonsViewEditDelete}>
                    <button onClick={() => handleOpenModalVer(tarea)} style={{ backgroundColor: "#6BB0FF" }}><IoEyeSharp /></button>
                    <button onClick={() => handleOpenModalEdit(tarea)} style={{ backgroundColor: "#85C86D" }}><FaPen /></button>
                    <button onClick={() => handleEliminarTarea(tarea)} style={{ backgroundColor: "#FF6B6B" }}><FaTrashAlt /></button>
                </div>
            </div>

            {sprintId && (
                <div className={style.sprintSpace} >
                    <button className={style.sendBacklog} onClick={() => handleEnviarAlbacklog(tarea)}>
                        Enviar al Backlog
                    </button>
                    <button className={style.changeState} onClick={() => handleCambiarEstado(tarea)}>
                        Cambiar estado
                    </button>
                </div>
            )}
            {openModalEdit && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalEA} idSprint={sprintId} />}
            {openModalVer && <ModalVer dataView={selectedTarea} handleCloseModal={handleCloseModalV} />}
        </div>

    )

}