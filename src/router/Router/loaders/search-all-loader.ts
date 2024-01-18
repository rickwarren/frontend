import { searchQuery } from "../../../services/api/search/searchApi";


export const searchAllLoader = async (params: any) => {
    return await searchQuery(params.query);
}