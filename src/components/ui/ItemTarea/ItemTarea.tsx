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
                <button onClick={() => handleOpenModalVer(tarea)} style={{ backgroundColor: "#6BB0FF", color: "white", border: "none" }}><IoEyeSharp /></button>
                <button onClick={() => handleOpenModalEdit(tarea)} style={{ backgroundColor: "#85C86D", color: "white", border: "none" }}><FaPen /></button>
                <button onClick={() => handleEliminarTarea(tarea)} style={{ backgroundColor: "#FF6B6B", color: "white", border: "none" }}><FaTrashAlt /></button>
            </div>
            {sprintId && (
                <div>
                    <button className={style.sendBacklog} onClick={() => handleEnviarAlbacklog(tarea)}>
                        Enviar al Backlog
                    </button>
                    <button className={style.changeState} onClick={() => handleCambiarEstado(tarea)}>
                        Cambiar estado
                    </button>
                </div>
            )}
            {openModalEdit && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalEA} />}
            {openModalVer && <ModalVer dataView={selectedTarea} handleCloseModal={handleCloseModalV} />}
        </div>

    )

}