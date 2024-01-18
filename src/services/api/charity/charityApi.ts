import { api } from "../../api";

const getCharities = async (): Promise<any> => {
    const response = await api.get('http://localhost:3000/charity/all');
    return response.data;
}

export {
    getCharities,
}