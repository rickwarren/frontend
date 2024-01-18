import React from 'react'
import { Link } from 'react-router-dom'

const SearchMenu = (props: any) => {
    return (
        <>
            <div className="feed-menu-button-wrapper">
                 <i className="fa fa-bars feed-menu-button" />
            </div>
            <div className="feed-menu-wrapper">
                <ul className="feed-menu-list">
                    <li className="feed-menu-item">
                        <Link to="/search-results/all">
                            <i className="fa fa-check-double" />
                            <h5>All</h5>
                        </Link>
                    </li>
                    <li className="feed-menu-item">
                        <Link to="/search-results/people">
                            <i className="fa fa-user" />
                            <h5>People</h5>
                        </Link>
                    </li>
                    <li className="feed-menu-item">
                        <Link to="/search-results/posts">
                            <i className="fa fa-sign-post" />
                            <h5>Posts</h5>
                        </Link>
                    </li>
                    <li className="feed-menu-item">
                        <Link to="/search-results/charities">
                            <i className="fa fa-hand-holding-heart" />
                            <h5>Charities</h5>
                        </Link>
                    </li>
                    <li className="feed-menu-item">
                        <Link to="/search-results/sponsors">
                            <i className="fa fa-briefcase" />
                            <h5>Sponsors</h5>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SearchMenu