import { FC } from "react";
import { ITarea } from "../../../../types/ITarea"
import styles from "./ModalVer.module.css";


type ModalVerProps = {
  // Propiedades que necesites para el modal
  tarea: ITarea;
  handleCloseModal: () => void;
}

export const ModalVer: FC<ModalVerProps> = ({ tarea, handleCloseModal }) => {

  return (
    <div className={styles.containerModal}>
      <div className={styles.modal}>
        <h2>Detalles de la Tarea</h2>
        <div className={styles.content}>
          <h3>{tarea.titulo}</h3>
          <p><strong>Descripción:</strong> {tarea.descripcion}</p>
          <p><strong>Fecha Límite:</strong> {tarea.fechaLimite}</p>
          <p><strong>Estado:</strong> {tarea.estado}</p>
        </div>
        <button onClick={handleCloseModal}>Cerrar</button>
      </div>
    </div>
  )
}
