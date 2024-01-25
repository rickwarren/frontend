import React from 'react'
import { Link } from 'react-router-dom'

const FeedMenu = (props: any) => {
    return (
        <>
            <div className="feed-menu-button-wrapper">
                <i className="fa fa-bars feed-menu-button" />
            </div>
            <div className="feed-menu-wrapper">
                <ul className="feed-menu-list">
                    <li className="feed-menu-item">
                        <Link to="/myprofile">
                            <i className="fa fa-user" />
                            <h5>My Profile</h5>
                        </Link>
                    </li>
                    <li className="feed-menu-item">
                        <Link to="/friends">
                            <i className="fa fa-user-group" />
                            <h5>Friends</h5>
                        </Link>
                    </li>
                    <li className="feed-menu-item">
                        <Link to="/videos">
                            <i className="fa fa-video" />
                            <h5>Videos</h5>
                        </Link>
                    </li>
                    <li className="feed-menu-item">
                        <Link to="/charities">
                            <i className="fa fa-hand-holding-heart" />
                            <h5>Charities</h5>
                        </Link>
                    </li>
                    <li className="feed-menu-item">
                        <Link to="/sponsors">
                            <i className="fa fa-briefcase" />
                            <h5>Sponsors</h5>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default FeedMenu