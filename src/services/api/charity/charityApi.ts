import { api } from "../../api";

const getCharities = async (): Promise<any> => {
    const response = await api.get('http://localhost:3000/charity/all');
    return response.data;
}

const getCharity = async (id: string): Promise<any> => {
    const response = await api.get('http://localhost:3000/charity/' + id);
    return response.data;
}

const getCharityByName = async (name: string): Promise<any> => {
    const response = await api.get('http://localhost:3000/charity/name/' + name);
    return response.data;
}

const createCharity = async (data: any): Promise<any> => {
    const response = await api.post('http://localhost:3000/charity', data);
    return response.data;
}

const updateCharity = async (data: any): Promise<any> => {
    const response = await api.put('http://localhost:3000/charity', data);
    return response.data;
}

const deleteCharity = async (id: string): Promise<any> => {
    const response = await api.delete('http://localhost:3000/charity/' + id);
    return response.data;
}

export {
    getCharities,
    getCharity,
    getCharityByName,
    createCharity,
    updateCharity,
    deleteCharity,
}