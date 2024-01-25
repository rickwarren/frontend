import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/dist';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';
import { searchQuery } from '../../services/api/search/searchApi';
import { TypedUseSelectorHook } from 'react-redux';
import { getUser } from '../../services/api/user';
import { Link } from 'react-router-dom';


export const SearchResultsPeople = () => {
    const location = useLocation();
    const path = location.search;
    const patharr = path.split('?q=')
    const [results, setResults] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await searchQuery(patharr[1]);
            const result = await Promise.all(res.profiles.map(async (person: any) => {
                return await getUser(person.ownerId)
            }))
            setResults(result);
        }
        fetchData();
    }, [path])

    return results && results.length > 0 ? (
        <div className="people-wrapper">
            <h1>People</h1>
            {results ? results.map((person: any) => {
                return (
                    <Link to={'/profile/' + person.urlString} key={person.id}>
                        <div className="user-wrapper">
                            <div className="banner-container">
                                <div className="img">&nbsp;
                                <div className="avatar-container">
                                    <img src={'http://localhost:3000/upload/' + person.profile.profilePhoto} height="100" className="avatar"/>    
                                </div>
                                <div className="user-info">
                                    <p className="name">{person.profile.firstName} {person.profile.lastName}</p>
                                    <p className="city">{person.profile.city}</p>
                                </div>
                                
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            }) : (
                <div>Loading...</div>
            )}
        </div>
    ) : ''
}