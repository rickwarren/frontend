import React from 'react'
import { useRouteLoaderData } from 'react-router-typesafe';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';

export const SearchResultsPeople = () => {
    const results: SearchResultsDto = useRouteLoaderData('seach') as SearchResultsDto;
    return results.users ? results.users?.map((user: any) => {
        return (
            <div key={user.id} className="user-wrapper">
                <User user={user} />
            </div>
        )
    }) : ''
}