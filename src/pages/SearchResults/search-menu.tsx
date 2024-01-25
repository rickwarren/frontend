import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom'
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';
import { searchQuery } from '../../services/api/search/searchApi';

const SearchMenu = (props: any) => {
    const [data, setData] = useState<SearchResultsDto>();
    const location = useLocation();
    const path = location.search;
    const patharr = path.split('?q=');
    const p = location.pathname;
    const parr = p.split('/');

    useEffect(() => {
        const fetchData = async () => {
            const result = await searchQuery(patharr[1]);
            setData(result);
        }
        fetchData();
    }, [path])
    return data ? (
        <>
            <div className="feed-menu-button-wrapper">
                <i className="fa fa-bars feed-menu-button" />
            </div>
            <div className="feed-menu-wrapper">
                <ul className="feed-menu-list">
                    <li className="feed-menu-item ">
                        <Link to={'/' + path}>
                            <i className="fa fa-house" />
                            <h5>Home</h5>
                        </Link>
                    </li>
                    <li className={parr[2] === 'all' || parr[1] === 'search' && parr[2] === undefined ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/search' + path}>
                            <i className="fa fa-check-double" />
                            <h5>All</h5>
                        </Link>
                    </li>
                    {data.profiles.length > 0 ? (
                    <li className={parr[2] === 'people' ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/search/people' + path}>
                            <i className="fa fa-user" />
                            <h5>People</h5>
                        </Link>
                    </li>
                    ) : ''}
                    {data.posts.length > 0 ? (
                    <li className={parr[2] === 'posts' ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/search/posts' + path}>
                            <i className="fa fa-signs-post" />
                            <h5>Posts</h5>
                        </Link>
                    </li>
                    ) : ''}
                    {data.charities.length > 0 ? (
                    <li className={parr[2] === 'charities' ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/search/charities' + path}>
                            <i className="fa fa-hand-holding-heart" />
                            <h5>Charities</h5>
                        </Link>
                    </li>
                    ) : ''}
                    {data.corporations.length > 0 ? (
                    <li className={parr[2] === 'sponsors' ? 'feed-menu-item active' : 'feed-menu-item'}>
                        <Link to={'/search/sponsors' + path}>
                            <i className="fa fa-briefcase" />
                            <h5>Sponsors</h5>
                        </Link>
                    </li>
                    ) : ''}
                </ul>
            </div>
        </>
    ) : (
        <>
            <div>Loading...</div>
        </>
    )
}

export default SearchMenu