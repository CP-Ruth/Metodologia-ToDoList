import { useEffect, useState } from "react";
import { useTareas } from "../../../hooks/useTareas"
import { ItemTarea } from "../ItemTarea/ItemTarea";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import styles from "./ListTareasBacklog.module.css"
import { ITarea } from "../../../types/ITarea";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";
import { useSprints } from "../../../hooks/useSprints";

export const ListTareasBacklog = () => {

    const { backlogTareas, getTodasTareasBacklog } = useTareas();
    const { listaSprints } = useSprints();
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);
    const [tareasProxVencer, setTareasProxVencer] = useState(false);

    useEffect(() => {
        getTodasTareasBacklog();
    }, []);

    const handleOpenModalAdd = (tarea: ITarea | null) => {
        setSelectedTarea(tarea);
        setOpenModalEdit(true);
    }

    const toggleFiltroProximas = () => {
        setTareasProxVencer(prev => !prev);

    };
    
    //filtro
    const isTareaProximaAVencer = (fechaLimite: string): boolean => {
        const hoy = new Date();
        const fecha = new Date(fechaLimite);
        const diffTime = fecha.getTime() - hoy.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 3;
    };

    const tareasFiltradas = tareasProxVencer
        ? backlogTareas.filter(t => isTareaProximaAVencer(t.fechaLimite))
        : backlogTareas;
    const handleCloseModalEA = () => { setOpenModalEdit(false) };

    return (
        <section>
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitleAddTarea}>
                    <h2>Tareas del Backlog</h2>
                    <button onClick={toggleFiltroProximas}>
                        {tareasProxVencer ? "Ver todas las tareas" : "Ver solo tareas próximas a vencer"}
                    </button>
                    <button onClick={() => handleOpenModalAdd(null)}>Crear tarea <MdOutlinePlaylistAdd /></button>
                </div>
                <div className={styles.containerTareas}>
                    {tareasFiltradas.length > 0 ? (
                        tareasFiltradas.map((el) =>
                            <ItemTarea key={el.id} tarea={el} sprints={listaSprints} />
                        )
                    ) : (
                        <h3>No hay tareas {tareasProxVencer ? "próximas a vencer" : ""}</h3>
                    )}

                </div>
            </div>
            {openModalEdit && <ModalEditarAñadir type="tarea" editData={selectedTarea} handleCloseModal={handleCloseModalEA} />}

        </section>
    )
}
