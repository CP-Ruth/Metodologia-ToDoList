import axios from "axios";
import { IBacklog } from "../types/ITarea";
import { ISpringLista } from "../types/ISpring";

const API_URL = "http://localhost:3000/";

export const getBacklogTareas = async () => {
  try {
    const response = await axios.get<IBacklog>(`${API_URL}/backlog`);
    return response.data.tareas; // Accede al array de tareas del backlog
  } catch (error) {
    console.error("Error al obtener las tareas del backlog:", error);
  }
};

export const getSpringsLista = async () => {
  try {
    const response = await axios.get<ISpringLista>(`${API_URL}/sprintList`);
    return response.data.springs; // Accede al array de prings
  } catch (error) {
    console.error("Error al obtener los springs:", error);
  }
};
