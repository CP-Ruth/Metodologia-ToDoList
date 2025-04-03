import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./ItemSprint.module.css"
import { IoEyeSharp } from "react-icons/io5";
import { FaPen, FaTrashAlt } from "react-icons/fa";

interface ItemSprint {
    sprint: ISprint;
}

export const ItemSprint: FC<ItemSprint> = ({ sprint }) => {
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
                    <button style={{backgroundColor:"#6BB0FF", color: "white", border: "none"}}><IoEyeSharp /></button>
                    <button style={{backgroundColor:"#85C86D", color: "white", border: "none"}}><FaPen /></button>
                    <button style={{backgroundColor:"#FF6B6B", color: "white", border: "none"}}><FaTrashAlt /></button>
            </div>
           
        </div>
    )
}
