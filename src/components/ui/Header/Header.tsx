import styles from './Header.module.css'
import logo from '../../../assets/images/mateBizcochuelo.ico';


export const Header = () => {
    return (
        <div className={styles.containerHeader}>
            <img className={styles.HeaderLogo} src={logo} alt="Logo" />

            <div>
                <h1 className={styles.HeaderTitle}>Mate y Bizcochuelo</h1>
                <p className={styles.HeaderSubTitle}>Administrador de tareas</p>
            </div>
        </div>
    )
}
