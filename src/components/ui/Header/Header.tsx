import styles from './Header.module.css'
//import logo from 'src/assets/images/mateYBizcochuelo.PNG';

export const Header = () => {
    return (
        <div className={styles.containerHeader}>
            <img className={styles.HeaderLogo } src="src/assets/images/mateYBizcochuelo.PNG" alt="Logo" />
            <div>
                <h1 className={styles.HeaderTitle}>Mate y Bizcochuelo</h1>
                <p className={styles.HeaderSubTitle}>Administrador de tareas</p>
            </div>
        </div>
    )
}
