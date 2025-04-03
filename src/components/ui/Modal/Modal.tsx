import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Modal.module.css'

export const Modal = () => {
    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
                <div className={styles.containerTitle}>
                    <h3>Editar/Crear tarea</h3>
                </div>
            <Form className={styles.containerForm}>
                <Form.Group>
                    <Form.Control type="text" placeholder="Titulo:"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Descripción:"/>
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Control type="date" name="date" />
                </Form.Group>
            
            </Form>
            <div className={styles.buttons}>
                <Button variant="secondary" className={styles.buttonConfirmar}>
                    Confirmar
                </Button>
                <Button variant="primary" className={styles.buttonCancelar} >
                    Cancelar
                </Button>
            </div>
            </div>
        </div>
    )
}
