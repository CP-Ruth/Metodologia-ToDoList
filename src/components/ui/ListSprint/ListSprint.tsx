import styles from "./ListSprint.module.css";
import { useEffect, useState } from "react";
import { useSprints } from "../../../hooks/useSprints"
import { ItemSprint } from "../ItemSprint/ItemSprint";
import { ISprint } from "../../../types/ISprint";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";
import { ModalVer } from "../Modal/ModalVer/ModalVer";

export const ListSprint = () => {

  const {listaSprints,getTodosLosSprint} = useSprints();
  const [openModalVer, setOpenModalVer] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState<ISprint | null>(null);


  useEffect(()=>{
    getTodosLosSprint();
  },[]);

  const handleOpenModalEdit =(sprint: ISprint)=>{
    setSelectedSprint(sprint);
    setOpenModalEdit(true);
  };

  const handleOpenModalVer =(sprint: ISprint)=>{
    setSelectedSprint(sprint);
    setOpenModalVer(true);
  };

  const handleCloseModalEA = () => { setOpenModalEdit(false) };
  const handleCloseModalV = () => { setOpenModalVer(false) }

  return (
    <section>
      <div className={styles.containerPrincipal}>

        {listaSprints.length>0?(
          listaSprints.map((sp)=> <ItemSprint sprint={sp} handleOpenModalVer= {handleOpenModalVer} handleOpenModalEdit={handleOpenModalEdit} />)
        ):(
          <p>No hay Sprints</p>
        )}
      </div>
      {openModalEdit && <ModalEditarAñadir type="sprint" editData={selectedSprint} handleCloseModal={handleCloseModalEA} />}
      {openModalVer && <ModalVer dataView={selectedSprint} handleCloseModal={handleCloseModalV} />}
    </section>
  )
}
