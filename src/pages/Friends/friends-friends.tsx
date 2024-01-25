import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';
import { searchFriendsOfFriendsQuery, searchFriendsQuery, searchQuery } from '../../services/api/search/searchApi';
import { TypedUseSelectorHook } from 'react-redux';
import { getCurrentUser, getUser } from '../../services/api/user';
import { Link } from 'react-router-dom';
import { getFriendsByUserId, getFriendsOfFriendsByUserId } from '../../services/api/friend-list';


export const FriendsOfFriends = () => {
    const location = useLocation();
    const path = location.search;
    const patharr = path.split('?q=')
    const [results, setResults] = useState<any>();
    const [visibility, setVisibility] = useState<string>('hidden');
    const [value, setValue] = useState<string>('');
    const navigate = useNavigate();
    let friends: any = [];

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
            navigate('/friends/friends?q=' + e.target.value);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCurrentUser();
            if(patharr[1] !== undefined) {
                let res = await searchFriendsOfFriendsQuery(patharr[1], result?.id);
                res = await Promise.all(res);
                setResults(res);
            } else {
                let res: any = await getFriendsOfFriendsByUserId(result?.id);
                res = await Promise.all(res?.users);
                res = res.map((friend: any) => {
                    friend = friend.data;
                    return friend;
                })
                await setResults(res);
            }
        }
        fetchData();
    }, [path])

    return results && results.length > 0 ? (
        <div className="friends-friends-wrapper">
            <div className="search-wrapper">
                 <input type="text" value={value} className="search-input" placeholder="Search" onKeyDown={onKeyDown} onChange={onChange} />
            </div>
            {results ? results.map((person: any) => {
                console.log('person: ', person);
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