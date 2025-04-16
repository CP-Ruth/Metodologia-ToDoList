import styles from './Navegacion.module.css';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { ListSprint } from '../ListSprint/ListSprint';
import { useState } from 'react';
import { ISprint } from '../../../types/ISprint';
import { ModalEditarAñadir } from '../Modal/ModalEditarAñadir/ModalEditarAñadir';


export const Navegacion = () => {

    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [selectedSprint, setSelectedSprint] = useState<ISprint | null>(null);


    const handleCloseModalAdd = ()=>{
        setOpenModalAdd(false);
    }

    return (
        <div className={styles.containerNav}>
            <button className={styles.buttonBacklog} >Backlog      <FaRegEdit /></button>
            <div className={styles.springSpace}>
                <div className={styles.springSpace__title}>
                <h3>Lista de Springs</h3>
                <button className={styles.buttonAddSpring} onClick={()=>{setSelectedSprint(null);
        setOpenModalAdd(true)}} ><MdOutlinePlaylistAdd /></button>
                </div>
                <div>
                    <ListSprint />
                </div>
            </div>
                    {openModalAdd && <ModalEditarAñadir type='sprint' editData={selectedSprint} handleCloseModal={handleCloseModalAdd} />}
        </div>
    )
}
