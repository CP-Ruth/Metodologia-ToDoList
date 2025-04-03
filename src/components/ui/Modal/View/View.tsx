import { AiFillCloseSquare } from "react-icons/ai"


import styles from "./View.module.css"
import { Form } from "react-bootstrap";
const View = () => {
    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
                <div className={styles.containerTitle}>
                    <h3>Tarea</h3>
                    <button><AiFillCloseSquare /></button>
                </div>
                <Form className={styles.containerForm}>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Titulo"/>
                    </Form.Group>
                    <Form.Group controlId="date">
                        <Form.Control type="date" name="date" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Descripción" style={{ resize: "none", height: "60px" }} />
                    </Form.Group>
                </Form>
            </div>
        </div>

)
}

export default View
