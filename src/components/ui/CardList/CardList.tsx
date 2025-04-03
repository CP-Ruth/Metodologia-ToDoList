import styles from './CardList.module.css'
import { FaTrashAlt,FaPen  } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
export const CardList = () => {
    return (
    <div className={styles.containerPrincipal} >
        <div className={styles.titleCardList}>
            <h2>Tareas en el backlog</h2>
            <button>Crear tarea</button>
        </div>
        <div  className={styles.containerTareas}>
            <div className={styles.tarea}>
                <div>
                    <h3>Titulo:</h3>
                </div>
                <div className={styles.buttonsAndSelect}> 
                    <select>
                        <option>Seleccionar spring</option>
                    </select>
                    <button style={{backgroundColor:"#2a55e3", color: "white", border: "none"}}><IoEyeSharp /></button>
                    <button style={{backgroundColor:"#3ab16b", color: "white", border: "none"}}><FaPen />
                    </button>
                    <button style={{backgroundColor:"#d15d5d", color: "white", border: "none"}}><FaTrashAlt /></button>
                    
                </div>
            </div>
        </div>
    </div>
    )
}

