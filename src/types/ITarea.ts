export interface ITarea {
    id?: string
    titulo: string
    descripcion: string
    estado: 'pendiente'|'en_progreso'|'completada'
    fechaLimite:string
}

export interface IBacklog {
    tareas: ITarea[]
}