import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';
import { searchFriendsQuery, searchQuery } from '../../services/api/search/searchApi';
import { TypedUseSelectorHook } from 'react-redux';
import { getCurrentUser, getUser } from '../../services/api/user';
import { Link } from 'react-router-dom';
import { getFriendsByUserId } from '../../services/api/friend-list';


export const FriendsList = () => {
    const location = useLocation();
    const path = location.search;
    const patharr = path.split('?q=')
    const [results, setResults] = useState<any>();
    const [visibility, setVisibility] = useState<string>('hidden');
    const [value, setValue] = useState<string>('');
    const navigate = useNavigate();

    const onClick = (e: any) => {
        setVisibility('hidden')
        setValue('');
    }

    const onChange = (e: any) => {
        setValue(e.target.value);
        if(e.target.value.length > 0) {
            setVisibility('visible')
        } else {
            setVisibility('hidden')
        }
    }

    const onKeyDown = async (e: any) => {
        if(e.key === 'Enter') {
            setVisibility('hidden');
            setValue('');
            navigate('/friends?q=' + e.target.value);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCurrentUser();
            if(patharr[1] !== undefined) {
                let res = await searchFriendsQuery(patharr[1], result?.id);
                res = await Promise.all(res);
                console.log(res);
                setResults(res);
            } else {
                let res: any = await getFriendsByUserId(result?.id);
                res = await Promise.all(res?.users);
                console.log(res);
                res = res.map((friend: any) => {
                    friend = friend.data;
                    return friend;
                })
                console.log(res);
                setResults(res);
            }
        }
        fetchData();
    }, [path])

    return results && results.length > 0 ? (
        <div className="friends-wrapper">
            <div className="search-wrapper">
                <input type="text" value={value} className="search-input" placeholder="Search" onKeyDown={onKeyDown} onChange={onChange} />
            </div>
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
    ) : (
        <div>No results found</div>
    )
}