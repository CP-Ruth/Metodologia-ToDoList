import { Header } from "../../ui/Header/Header"
import { Navegacion } from "../../ui/Navegacion/Navegacion"
import styles from "./SprintView.module.css";

export const SprintView = () => {
  return (
    <div className={styles.containerSprint}>
            <Header />
            <Navegacion />
            
        </div>
  )
}
