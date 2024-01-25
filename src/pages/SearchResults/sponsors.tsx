import React, { useEffect, useState } from 'react'
import { Post } from '../../components/Post';
import { useLocation } from 'react-router-dom/dist';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';
import { searchQuery } from '../../services/api/search/searchApi';
import { Link } from 'react-router-dom';

export const SearchResultsSponsors = () => {
    const location = useLocation();
    const path = location.search;
    const patharr = path.split('?q=')
    const [results, setResults] = useState<SearchResultsDto>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await searchQuery(patharr[1]);
            setResults(res);
        }
        fetchData();
    }, [path])
    
    return results && results.corporations.length > 0 ? (
        <div className="sponsors-container">
            <h1>Sponsors</h1>
            {results ? results.corporations.map((sponsor: any) => {
                return (
                <div key={sponsor.id} className="sponsor-wrapper">
                    <Link to={'/charity/' + sponsor.name}>
                        <img src={'http://localhost:3000/upload/' + sponsor.logo} height="130" className="sponsor-logo" alt={sponsor.name} />
                    </Link>
                </div>
                )
            }) : (
                <div>Loading...</div>
            )}
        </div>
    ) : ''
}