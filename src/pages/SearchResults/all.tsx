import { useRouteLoaderData } from "react-router-typesafe";
import { SearchResultsDto } from "../../services/api/search/dto/search-results.dto";
import { SearchResultsPeople } from "./people";
import { SearchResultsPosts } from './posts';
import { SearchResultsCharities } from "./charities";
import { SearchResultsSponsors } from "./sponsors";

export const SearchResultsAll = () => {
    return (
        <>
            <SearchResultsPeople />
            <SearchResultsPosts />
            <SearchResultsCharities />
            <SearchResultsSponsors />
        </>
    )
    
}