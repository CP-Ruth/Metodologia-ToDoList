import { useParams } from "react-router-dom";
import { TareasPorEstado } from "../TareasPorEstado/TareasPorEstado"
import style from "./ListTareasSprint.module.css"
import { useSprints } from "../../../hooks/useSprints";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";


export const ListTareasSprint = () => {
  //Leer query param sprint para filtrar y mostrar las tareas del sprint seleccionado.
  const { sprintId } = useParams();
  const { obtenerSprintPorId } = useSprints();

  const [sprint, setSprint] = useState<ISprint | null>(null);
  useEffect(() => {
    const fetchSprint = async () => {
      if (sprintId) {
        const result = await obtenerSprintPorId(sprintId);
        if (result) {
          setSprint(result);
        }
      }
    };

    fetchSprint();
  }, [sprintId]);

  if (!sprint) return <p>Cargando sprint...</p>;

  return (
    <section>
      <div className={style.sprintHeader}>
        <h2>{sprint?.nombre}</h2>
        <button></button>
      </div>

      <div className={style.sprintTablero}>
        <TareasPorEstado estadoTarea="pendiente" tareas={sprint.tareas.filter((t) => t.estado === "pendiente")} />
        <TareasPorEstado estadoTarea="en_progreso" tareas={sprint.tareas.filter((t) => t.estado === "en_progreso")} />
        <TareasPorEstado estadoTarea="completada" tareas={sprint.tareas.filter((t) => t.estado === "completada")} />
      </div>
    </section>
  )
}
