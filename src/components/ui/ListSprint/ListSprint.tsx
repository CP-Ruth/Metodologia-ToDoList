import styles from "./ListSprint.module.css";
import { useEffect, useState } from "react";
import { useSprints } from "../../../hooks/useSprints"
import { ItemSprint } from "../ItemSprint/ItemSprint";
import { ISprint } from "../../../types/ISprint";
import { ModalEditarAñadir } from "../Modal/ModalEditarAñadir/ModalEditarAñadir";

export const ListSprint = () => {

  const {listaSprints,getTodosLosSprint} = useSprints();
  const [openModalSprint, setOpenModalSprint] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState<ISprint | null>(null);


  useEffect(()=>{
    getTodosLosSprint();
  },[]);

  const handleOpenModalEdit =(sprint: ISprint)=>{
    setSelectedSprint(sprint);
    setOpenModalSprint(true);
  };

  const handleCloseModal = ()=>{ setOpenModalSprint(false)};


  return (
    <section>
      <div className={styles.containerPrincipal}>

        {listaSprints.length>0?(
          listaSprints.map((sp)=> <ItemSprint sprint={sp} handleOpenModalEdit={handleOpenModalEdit} />)
        ):(
          <p>No hay Sprints</p>
        )}
      </div>
      {openModalSprint && <ModalEditarAñadir type="sprint" editData={selectedSprint} handleCloseModal={handleCloseModal} />}
      {/* <ModalEditarAñadir type="sprint" editData={selectedSprint} handleCloseModal={handleCloseModal} /> */}
    </section>
  )
}
