import { useParams } from "react-router-dom";
import { TareasPorEstado } from "../TareasPorEstado/TareasPorEstado"
import style from "./ListTareasSprint.module.css"
import { useState } from "react";
import { ITarea } from "../../../types/ITarea";
import { useSprints } from "../../../hooks/useSprints";

export const ListTareasSprint = () => {
//Leer query param sprint para filtrar y mostrar las tareas del sprint seleccionado.
  const { sprintId } = useParams();

  const [tareas, setTareas] = useState<ITarea[]>([]);
  const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);
  const [openModaladd, setOpenModalAdd] = useState(false);
  const { getSprintById } = useSprints();

  const sprint = getSprintById(sprintId!);


  return (
    <section>
      <div className={style.sprintHeader}>
        <h2>{sprint.nombre}</h2>
        <button></button>
      </div>

      <div className={style.sprintTablero}>
        <TareasPorEstado estadoTarea="pendiente" tareas={tareas} />
        <TareasPorEstado estadoTarea="en_progreso" tareas={tareas} />
        <TareasPorEstado estadoTarea="completada" tareas={tareas} />
      </div>
    </section>
  )
}
