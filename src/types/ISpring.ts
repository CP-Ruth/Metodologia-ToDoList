import { ITarea } from "./ITarea"

export interface ISpring{
    id:string
    dechaInicio:string
    fechaCierre:string
    nombre:string
    tareas: ITarea[]
}

export interface ISpringLista{
    springs: ISpring[]
}