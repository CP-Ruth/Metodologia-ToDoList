import styles from './Navegacion.module.css';
import { FaRegEdit } from "react-icons/fa";

import { ListSprings } from '../ListSprings/ListSprings';
import { CardList } from '../CardList/CardList';


export const Navegacion = () => {
    return (
        <div className={styles.containerNav}>
            <div className={styles.containerButton}>
            <button className={styles.buttonBacklog}>Backlog      <FaRegEdit /></button>
            </div>
            <div className={styles.springSpace}>
                <ListSprings />
                <CardList/>
            </div>
        </div>
    )
}
