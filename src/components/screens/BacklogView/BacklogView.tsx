import { Header } from "../../ui/Header/Header"
import { Navegacion } from "../../ui/Navegacion/Navegacion"
import styles from "./BacklogView.module.css";

export const BacklogView = () => {
    return (
        <div className={styles.containerBacklog}>
            <Header />
            <Navegacion />
            <div className={styles.containerBacklog_view} >
                <p>hola</p>
            </div>
        </div>
    )
}
