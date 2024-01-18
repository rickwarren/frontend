import React from 'react'
import { useRouteLoaderData } from 'react-router-typesafe';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';

export const SearchResultsCharities = () => {
    const results: SearchResultsDto = useRouteLoaderData('seach') as SearchResultsDto;
    return results.charities ? results.charities?.map((charity: any) => {
        return (
            <div key={charity.id} className="charity-wrapper">
                <Charity charity={charity} />
            </div>
        )
    }) : ''
}  