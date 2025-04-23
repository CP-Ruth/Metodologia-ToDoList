import { useEffect, useState } from "react";
import { useTareas } from "../../../hooks/useTareas"
import { ItemTarea } from "../ItemTarea/ItemTarea";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import styles from "./ListTareasBacklog.module.css"
import { ITarea } from "../../../types/ITarea";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";
import { ModalVer } from "../Modal/ModalVer/ModalVer";

export const ListTareasBacklog = () => {

    const { backlogTareas, getTodasTareasBacklog, eliminarTareaDelBacklog } = useTareas();
    const [openModalVer, setOpenModalVer] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);

    useEffect(() => {
        getTodasTareasBacklog();
    }, []);

    const handleOpenModalEdit = (tarea: ITarea) => {
        setSelectedTarea(tarea);
        setOpenModalEdit(true);
    }

    const handleOpenModalVer = (tarea: ITarea) => {
        setSelectedTarea(tarea);
        setOpenModalVer(true);
    }

    const handleCloseModalEA = () => { setOpenModalEdit(false) };
    const handleCloseModalV = () => { setOpenModalVer(false) }
    return (
        <section>
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitleAddTarea}>
                    <h2>Tareas del Backlog</h2>
                    <button onClick={() => { setSelectedTarea(null); setOpenModalEdit(true); }}>Crear tarea <MdOutlinePlaylistAdd /></button>
                </div>
                <div className={styles.containerTareas}>
                    {backlogTareas.length > 0 ? (
                        backlogTareas.map((el) => <ItemTarea tarea={el} editar={handleOpenModalEdit} ver={handleOpenModalVer}  eliminar={()=> eliminarTareaDelBacklog(el._id!)}/>)
                    ) : (
                        <h3>No hay tareas</h3>
                    )}
                </div>
            </div>
            {openModalEdit && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalEA} />}
            {openModalVer && <ModalVer dataView={selectedTarea} handleCloseModal={handleCloseModalV} />}
        </section>
    )
}
