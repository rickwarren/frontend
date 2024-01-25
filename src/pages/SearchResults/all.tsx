import React, { useEffect, useState } from 'react';
import { SearchResultsPeople } from "./people";
import { SearchResultsPosts } from './posts';
import { SearchResultsCharities } from "./charities";
import { SearchResultsSponsors } from "./sponsors";
import { searchQuery } from '../../services/api/search/searchApi';
import { useLocation } from 'react-router-dom/dist';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';

export const SearchResultsAll = () => {
    return (
        <div className="search-results-container">
            <SearchResultsPeople />
            <SearchResultsPosts />
            <SearchResultsCharities />
            <SearchResultsSponsors />
        </div>
    )
}