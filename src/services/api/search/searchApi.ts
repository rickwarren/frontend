import React from 'react';
import { api } from "../../api";

async function searchQuery(query: string): Promise<any> {
    const response = await api.get("http://localhost:3000/search/" + query);
    return response.data;
}

async function searchFriendsQuery(query: string, userId: string): Promise<any> {
    const response = await api.get("http://localhost:3000/search/friends/" + query + "/" + userId);
    return response.data;
}

async function searchFriendsOfFriendsQuery(query: string, userId: string): Promise<any> {
    const response = await api.get("http://localhost:3000/search/friends/friends/" + query + "/" + userId);
    return response.data;
}

export {
    searchQuery,
    searchFriendsQuery,
    searchFriendsOfFriendsQuery,
}