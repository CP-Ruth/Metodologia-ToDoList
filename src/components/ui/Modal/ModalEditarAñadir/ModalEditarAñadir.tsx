import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { ITarea } from "../../../../types/ITarea";
import { useTareas } from "../../../../hooks/useTareas";
import styles from "./ModalEditarAñadir.module.css";

type IModalEditarAñadir = {
    editTarea: ITarea | null;
    handleCloseModal: () => void;
};

const initialStateTarea: ITarea = {
    id: "",
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    estado: "pendiente"
};

export const ModalEditarAñadir: FC<IModalEditarAñadir> = ({ editTarea, handleCloseModal }) => {

    const { crearTareaParaBacklog, modificarTareaDelBacklog } = useTareas();

    const [dataForm, setDataForm] = useState<ITarea>(initialStateTarea);
    const handlerDataForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDataForm((state) => ({ ...state, [name]: value }))
    };

    const handlerSubmitData = (e: FormEvent) => {
        e.preventDefault();
        if (!("id" in dataForm)) {
            crearTareaParaBacklog({ ...dataForm, id: new Date().toDateString() });
        } else {
            modificarTareaDelBacklog(dataForm);
        }

        handleCloseModal();
    }
    useEffect(() => {
        if (editTarea) setDataForm(editTarea);
        else setDataForm(initialStateTarea);
    }, [editTarea])

    return (
        <div className={styles.containerModal}>
            <div className={styles.modal}>
                <div>
                    <h2>{editTarea ? "Editar " : "Añadir "}Tarea</h2>
                </div>
                <form onSubmit={handlerSubmitData}>
                    <input
                        type="text" required
                        name="titulo"
                        value={dataForm.titulo}
                        placeholder="Título de la tarea"
                        onChange={handlerDataForm}
                    />
                    <input
                        type="text" required
                        name="descripcion"
                        value={dataForm.descripcion}
                        placeholder="Describe la tarea"
                        onChange={handlerDataForm}
                    />

                    <div>
                        <input
                            type="date" required
                            name="fechaLimite"
                            value={dataForm.fechaLimite}
                            placeholder="Fecha Limite"
                            onChange={handlerDataForm}
                        />
                    </div>
                    <div>
                        <button type="submit">{editTarea ? "Guardar" : "Crear"}</button>
                        <button onClick={handleCloseModal} type="button">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
