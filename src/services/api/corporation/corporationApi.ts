import { api } from "../../api";

const getCorporations = async (): Promise<any> => {
    const response = await api.get("http://localhost:3000/corporation/all");
    return response.data;
}

export {
    getCorporations,
}
