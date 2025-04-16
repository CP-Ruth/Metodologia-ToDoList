import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { ITarea } from "../../../../types/ITarea";
import { ISprint } from "../../../../types/ISprint";
import { useTareas } from "../../../../hooks/useTareas";
import styles from "./ModalEditarAñadir.module.css";
import { useSprints } from "../../../../hooks/useSprints";

type ModalEditarAñadirProps = {
    type: "tarea" | "sprint";
    editData: ITarea | ISprint | null;
    handleCloseModal: () => void;
};

const initialStateTarea: ITarea = {
    id: "",
    titulo: "",
    descripcion: "",
    fechaLimite: "",
    estado: "pendiente",
};

const initialStateSprint: ISprint = {
    id: "",
    nombre: "",
    fechaInicio: "",
    fechaCierre: "",
    tareas: [],
};

export const ModalEditarAñadir: FC<ModalEditarAñadirProps> = ({ type, editData, handleCloseModal }) => {
    const { crearTareaParaBacklog, modificarTareaDelBacklog, getTodasTareasBacklog } = useTareas();
    const { crearSprint, modificarSprint, getTodosLosSprint } = useSprints();

    const [dataForm, setDataForm] = useState<ITarea | ISprint>(
        type === "tarea" ? initialStateTarea : initialStateSprint
    );

    const handlerDataForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDataForm((state) => ({ ...state, [name]: value }));
    };

    const handlerSubmitData = async (e: FormEvent) => {
        e.preventDefault();
        if (type === "tarea") {
            const tarea = dataForm as ITarea;
            if (!tarea.id) {
                await crearTareaParaBacklog({ ...tarea, id: new Date().toISOString() });
            } else {
                await modificarTareaDelBacklog(tarea);
            }
            await getTodasTareasBacklog();
        } else if (type === "sprint") {
            const sprint = dataForm as ISprint;
            if (!sprint.id) {
                await crearSprint({ ...sprint, id: new Date().toISOString(), tareas: [] });
            } else {
                await modificarSprint(sprint);
            }
            await getTodosLosSprint();
        }
        handleCloseModal();
    };
    useEffect(() => {
        if (editData) setDataForm(editData);
        else setDataForm(type === "tarea" ? initialStateTarea : initialStateSprint);
    }, [editData, type]);

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
                <div className={styles.containerTitle}>
                <h2>{editData ? "Editar" : "Crear"} {type === "tarea" ? "Tarea" : "Sprint"}</h2>
                </div>

                <form className={styles.containerForm} onSubmit={handlerSubmitData}>
                    {type === "tarea" ? (
                        <>
                            <input type="text" required name="titulo" value={(dataForm as ITarea).titulo} placeholder="Título de la tarea" onChange={handlerDataForm} />
                            <input type="text" required name="descripcion" value={(dataForm as ITarea).descripcion} placeholder="Describe la tarea" onChange={handlerDataForm} />
                            <input type="date" required name="fechaLimite" value={(dataForm as ITarea).fechaLimite} onChange={handlerDataForm} />
                        </>
                    ) : (
                        <>
                            <input type="text" required name="nombre" value={(dataForm as ISprint).nombre} placeholder="Nombre del sprint" onChange={handlerDataForm} />
                            <input type="date" required name="fechaInicio" value={(dataForm as ISprint).fechaInicio} onChange={handlerDataForm} />
                            <input type="date" required name="fechaCierre" value={(dataForm as ISprint).fechaCierre} onChange={handlerDataForm} />
                        </>
                    )}
                    <div className={styles.buttons}>
                        <button className={styles.buttonConfirmar} type="submit">{editData ? "Guardar" : "Crear"}</button>
                        <button className={styles.buttonCancelar} onClick={handleCloseModal} type="button">Cancelar</button>
                    </div>
                </form>
                </div>
            </div>
        
    );
};
