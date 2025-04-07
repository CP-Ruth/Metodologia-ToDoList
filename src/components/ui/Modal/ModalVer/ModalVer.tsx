import { FC } from "react";
import { ITarea } from "../../../../types/ITarea";
import { ISprint } from "../../../../types/ISprint";
import styles from "./ModalVer.module.css";

type ModalVerProps = {
  dataView: ITarea | ISprint | null;
  handleCloseModal: () => void;
};

// Type guard para saber si es una tarea
const esTarea = (item: ITarea | ISprint): item is ITarea => {
  return (item as ITarea).estado !== undefined;
};

export const ModalVer: FC<ModalVerProps> = ({ dataView, handleCloseModal }) => {
  if (!dataView) return null;

  return (
    <div className={styles.containerModal}>
      <div className={styles.modal}>
        {esTarea(dataView) ? (
          <>
            <h2>Detalles de la Tarea</h2>
            <div className={styles.content}>
              <h3>{dataView.titulo}</h3>
              <p><strong>Descripción:</strong> {dataView.descripcion}</p>
              <p><strong>Fecha Límite:</strong> {dataView.fechaLimite}</p>
              <p><strong>Estado:</strong> {dataView.estado}</p>
            </div>
          </>
        ) : (
          <>
            <h2>Detalles del Sprint</h2>
            <div className={styles.content}>
              <h3>{dataView.nombre}</h3>
              <p><strong>Fecha de Inicio:</strong> {dataView.fechaInicio}</p>
              <p><strong>Fecha de Cierre:</strong> {dataView.fechaCierre}</p>
              <p><strong>Tareas:</strong></p>
              <ul>
                {dataView.tareas.map((tarea) => (
                  <li key={tarea.id}>{tarea.titulo}</li>
                ))}
              </ul>
            </div>
          </>
        )}
        <button onClick={handleCloseModal}>Cerrar</button>
      </div>
    </div>
  );
};
