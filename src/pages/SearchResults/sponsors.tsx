import React from 'react'
import { useRouteLoaderData } from 'react-router-typesafe';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';

export const SearchResultsSponsors = () => {
    const results: SearchResultsDto = useRouteLoaderData('seach') as SearchResultsDto;
    return results.corporations ? results.corporations?.map((sponsor: any) => {
        return (
            <div key={sponsor.id} className="sponsor-wrapper">
                <Sponsor sponsor={sponsor} />
            </div>
        )
    }) : ''
}