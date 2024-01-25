import React, { useEffect, useState } from 'react'
import { Post } from '../../components/Post';
import { useLocation } from 'react-router-dom/dist';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';
import { searchQuery } from '../../services/api/search/searchApi';
import { Link } from 'react-router-dom';

export const SearchResultsCharities = () => {
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
    
    return results && results.charities.length > 0 ? (
        <div className="charities-container">
            <h1>Charities</h1>
            {results ? results.charities.map((charity: any) => {
                return (
                <div key={charity.id} className="charity-wrapper">
                    <Link to={'/charity/' + charity.name}>
                        <img src={'http://localhost:3000/upload/' + charity.logo} height="130" className="charity-logo" alt={charity.name} />
                    </Link>
                </div>
                )
            }) : (
                <div>Loading...</div>
            )}
        </div>
    ) : ''
}