import styles from './Navegacion.module.css';
import { FaRegEdit } from "react-icons/fa";

import { MdOutlinePlaylistAdd } from "react-icons/md";
import { ListSprings } from '../ListSprings/ListSprings';


export const Navegacion = () => {
    return (
        <div className={styles.containerNav}>
            <button className={styles.buttonBacklog}>Backlog      <FaRegEdit /></button>
            <div className={styles.springSpace}>
                <div className={styles.springSpace__title}>
                <h3>Lista de Springs</h3>
                <button className={styles.buttonAddSpring}><MdOutlinePlaylistAdd /></button>
                </div>
                <div>
                    <ListSprings />
                </div>
            </div>
        </div>
    )
}
