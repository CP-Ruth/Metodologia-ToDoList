import { useParams } from "react-router-dom";
import { TareasPorEstado } from "../TareasPorEstado/TareasPorEstado"
import style from "./ListTareasSprint.module.css"
import { useSprints } from "../../../hooks/useSprints";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";


export const ListTareasSprint = () => {
  //Leer query param sprint para filtrar y mostrar las tareas del sprint seleccionado.
  const { sprintId } = useParams();
  const { getSprintPorId } = useSprints();

  const [sprint, setSprint] = useState<ISprint | null>(null);
  useEffect(() => {
    if (!sprintId) return;
    const fetchSprint = async () => {
      const result = await getSprintPorId(sprintId);
      if (result) setSprint(result);
    };
    fetchSprint();
  }, [sprintId, getSprintPorId]);

  if (!sprint) return <p>Cargando sprint...</p>;

  return (
    <section>
      <div className={style.sprintHeader}>
        <h2>{sprint?.nombre}</h2>
        <button></button>
      </div>

      <div className={style.sprintTablero}>
        <TareasPorEstado sprint={sprint} tareas={sprint.tareas.filter((t) => t.estado === "pendiente")} estadoTarea="pendiente"/>
        <TareasPorEstado sprint={sprint} tareas={sprint.tareas.filter((t) => t.estado === "en_progreso")} estadoTarea="en_progreso"/>
        <TareasPorEstado sprint={sprint} tareas={sprint.tareas.filter((t) => t.estado === "completada")} estadoTarea="completada"/>
      </div>
    </section>
  )
}
