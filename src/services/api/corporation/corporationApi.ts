import { api } from "../../api";

const getCorporations = async (): Promise<any> => {
    const response = await api.get('http://localhost:3000/corporation/all');
    return response.data;
}

const getCorporation = async (id: string): Promise<any> => {
    const response = await api.get('http://localhost:3000/corporation/' + id);
    return response.data;
}

const getCorporationByName = async (name: string): Promise<any> => {
    const response = await api.get('http://localhost:3000/corporation/name/' + name);
    return response.data;
}

const createCorporation = async (data: any): Promise<any> => {
    const response = await api.post('http://localhost:3000/corporation', data);
    return response.data;
}

const updateCorporation = async (data: any): Promise<any> => {
    const response = await api.put('http://localhost:3000/corporation', data);
    return response.data;
}

const deleteCorporation = async (id: string): Promise<any> => {
    const response = await api.delete('http://localhost:3000/corporation/' + id);
    return response.data;
}

export {
    getCorporations,
    getCorporation,
    getCorporationByName,
    createCorporation,
    updateCorporation,
    deleteCorporation,
}