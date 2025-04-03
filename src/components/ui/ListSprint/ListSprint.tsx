//import styles from "./ListSprings.module.css";

import { useEffect } from "react";
import { useSprints } from "../../../hooks/useStrints"
import { ItemSprint } from "../ItemSprint/ItemSprint";

export const ListSprint = () => {

  const {listaSprints,getTodosLosSprint} = useSprints();
  useEffect(()=>{
    getTodosLosSprint();
  })
  return (
    <section>
      <div>
        {listaSprints.length>0?(
          listaSprints.map((sp)=> <ItemSprint sprint={sp} />)
        ):(
          <p>No hay Sprints</p>
        )}
      </div>
    </section>
  )
}
