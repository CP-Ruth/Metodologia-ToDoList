import { useEffect, useState } from "react";
import { useTareas } from "../../../hooks/useTareas"
import { ItemTareaBacklog } from "../ItemTareaBacklog/ItemTareaBacklog";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import styles from "./ListTareasBacklog.module.css"
import { ITarea } from "../../../types/ITarea";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";

export const ListTareasBacklog = () => {

    const { backlogTareas, getTodasTareasBacklog } = useTareas();
    useEffect(() => {
        getTodasTareasBacklog();
    }, []);

    const [openModalTarea, setOpenModalTarea] = useState(false);
    const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);

    const handleOpenModalEdit =(tarea: ITarea)=>{
        setSelectedTarea(tarea);
        setOpenModalTarea(true);
    }

    const handleCloseModal = ()=>{ setOpenModalTarea(false)}

    return (
        <section>
            <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAddTarea}>
                <h2>Tareas del Backlog</h2>
                <button onClick={()=> setOpenModalTarea(true)}>Crear tarea <MdOutlinePlaylistAdd /></button>
            </div>
            <div className={styles.containerTareas}>
                {backlogTareas.length > 0 ? (
                    backlogTareas.map((el) => <ItemTareaBacklog tarea={el} handleOpenModalEdit={handleOpenModalEdit} />)
                ) : (
                    <h3>No hay tareas</h3>
                )}
            </div>
            </div>
            {openModalTarea&& <ModalEditarAñadir editTarea={selectedTarea} handleCloseModal={handleCloseModal} />}
        </section>
    )
}
