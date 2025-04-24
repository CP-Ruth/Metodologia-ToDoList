import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./ItemSprint.module.css"
import { IoEyeSharp } from "react-icons/io5";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useSprints } from "../../../hooks/useSprints";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface ItemSprint {
    sprint: ISprint;
    handleOpenModalVer: (sprint: ISprint) => void;
    handleOpenModalEdit: (sprint: ISprint) => void;
}

export const ItemSprint: FC<ItemSprint> = ({ sprint, handleOpenModalVer, handleOpenModalEdit }) => {
    const navigate = useNavigate();
    const verListaTareasDelSprint = () => {
        navigate(`/sprint/${sprint.id}`);
    }
    const { eliminarSprint } = useSprints();

    const editarSprint = () => {
        handleOpenModalEdit(sprint);
    };

    const eliminarSprintt =  async  (id: string) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            await eliminarSprint(id);
            Swal.fire("¡Eliminado!", "El sprint ha sido eliminado.", "success");
        }
    };

    return (
        <div className={styles.ContainerItemSprint}>
            <div className={styles.ItemSprint__Info}>
                <h4>{sprint.nombre}</h4>
                <div>
                    <p>FI: {sprint.fechaInicio}</p>
                    <p>FC: {sprint.fechaCierre}</p>
                </div>
            </div>
            <div className={styles.ItemSprint__buttons}>
                <button onClick={verListaTareasDelSprint} style={{ backgroundColor: "#6BB0FF", color: "white", border: "none" }}><IoEyeSharp /></button>
                <button onClick={editarSprint} style={{ backgroundColor: "#85C86D", color: "white", border: "none" }}><FaPen /></button>
                <button onClick={() => { eliminarSprintt(sprint.id!); }} style={{ backgroundColor: "#FF6B6B", color: "white", border: "none" }}><FaTrashAlt /></button>
            </div>
        </div>
    )
}
