import { useEffect } from "react";
import { useTareas } from "../../../hooks/useTareas"
import { ItemTareaBacklog } from "../ItemTareaBacklog/ItemTareaBacklog";


export const ListTareasBacklog = () => {

    const { backlogTareas, getTodasTareasBacklog, eliminarTareaDelBacklog } = useTareas();
    useEffect(() => {
        getTodasTareasBacklog();
    }, []);



    return (
        <section>
            <div>
                {backlogTareas.length > 0 ? (
                    backlogTareas.map((el) => <ItemTareaBacklog tarea={el} />)
                ) : (
                    <h3>No hay tareas</h3>
                )}
            </div>
        </section>
    )
}
