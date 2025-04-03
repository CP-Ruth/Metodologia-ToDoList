import { MdOutlinePlaylistAdd } from "react-icons/md";
import styles from "./ListSprings.module.css";

export const ListSprings = () => {
  return (
    <div className={styles.listSpringsContainer}>
      <div className={styles.containerTitleButton}>
        <h4>Lista de Springs</h4>
        <button className={styles.buttonAddSpring}><MdOutlinePlaylistAdd /></button>
      </div>
      <div className={styles.springItem}>Spring 1</div>
    </div>
  )
}
