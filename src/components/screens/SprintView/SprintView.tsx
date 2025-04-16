import { useParams } from "react-router-dom";
import { Header } from "../../ui/Header/Header"
import { Navegacion } from "../../ui/Navegacion/Navegacion"
import styles from "./SprintView.module.css";
import { useEffect, useState } from "react";
import { getListaSrintApi } from "../../../http/sprintService";
import { ITarea } from "../../../types/ITarea";
import { useSprints } from "../../../hooks/useSprints";
import { MdOutlinePlaylistAdd } from "react-icons/md";

export const SprintView = () => {
  //Leer query param sprint para filtrar y mostrar las tareas del sprint seleccionado.
      const{sprintId} = useParams();
      
    const [openModaladd, setOpenModalAdd] = useState(false);
    const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);
      const[tareas, setTareas] = useState<ITarea[]>([]);
      const {getSprintById} = useSprints();
      //const [error,setError] = useState<string | null>(null);

      useEffect(()=>{
          const fetchTareasSprint = async () => {
              try {
                  const sprints = await getListaSrintApi();
                  const sprint = sprints.find((sp)=> sp.id == sprintId);
                  if(sprint){
                      setTareas(sprint.tareas);
                  } 
              } catch (error) {
                  console.error(error)
              }
          }
          fetchTareasSprint();
      },[sprintId]);

      const handleOpenModalAdd = (tarea: ITarea) => {
        setSelectedTarea(tarea);
        setOpenModalAdd(true);
    }
  return (
    <div className={styles.containerSprint}>
            <Header />
            <Navegacion />
            <section>
              <div>
                <h2></h2> //nomre del sprint selecionado
                <button onClick={() => { setSelectedTarea(null); setOpenModalAdd(true); }}>Crear tarea <MdOutlinePlaylistAdd /></button>
              </div>
              <div>
                <div className={styles.tareasPendiente}>
                  <h3>Pendientes</h3>
                  {tareas.length>0? (
                    tareas.map((tarea)=> tarea.estado == "pendiente")
                  ):(
                    <p>No hay tareas pendientes</p>
                  )}
                </div>
                <div className={styles.tareasEnProgreso}>
                <h3>En progreso</h3>
                {tareas.length>0? (
                    tareas.map((tarea)=> tarea.estado == "en_progreso")
                  ):(
                    <p>No hay tareas en progreso</p>
                  )}
                </div>
                <div className={styles.tareasCompletada}>
                <h3>Completadas</h3>
                {tareas.length>0? (
                    tareas.map((tarea)=> tarea.estado == "completada")
                  ):(
                    <p>No hay tareas completadas</p>
                  )}
                </div>
              </div>
            </section>
        </div>
  )
}
