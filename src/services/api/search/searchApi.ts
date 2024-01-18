import { api } from "../../api";

async function searchQuery(query: string): Promise<any> {
    const response = await api.get("http://localhost:3000/search/" + query);
    return response.data;
}

export {
    searchQuery,
}