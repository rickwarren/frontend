import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.styles.scss';
import Logo from '../assets/react.svg';
import { useSession } from '../../hooks';

const Sidebar: React.FC = (props: any) => {
    const [isVisible, setIsVisible] = useState(true);
    const { isAuthenticated, user, signOut } = useSession()

    const hideSidebar = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <div className={isVisible ? 'sidebar' : 'sidebar shrink'}>
                <Link to="feed"><div className={isVisible ? 'logo' : 'icon'} /></Link>
                <nav className="link-wrapper">
                    <ul className={isVisible ? undefined : 'hidden'} >
                        <li><Link to="friends"><div className="discover-radio" /> Friends</Link></li>
                        <li><Link to="groups"><div className="discover-profiles" /> Groups</Link></li>
                        <li><Link to="events"><div className="discover-featured" /> Events</Link></li>
                    </ul>
                    <ul className={isVisible ? 'hidden' : undefined} >
                        <li><Link to="friends"><div className="discover-radio enlarge" /></Link></li>
                        <li><Link to="groups"><div className="discover-profiles enlarge" /></Link></li>
                        <li><Link to="events"><div className="discover-featured enlarge" /></Link></li>
                    </ul>
                </nav>
                <nav className="link-wrapper">
                    <ul className={isVisible ? undefined : 'hidden'} >
                        <li>
                            {isAuthenticated && (
                                <>
                                <div onClick={signOut}><div className="settings" />Logout</div>
                                </>
                            )}
                        </li>
                    </ul>
                    <ul className={isVisible ? 'hidden' : undefined} >
                        <li>
                            {isAuthenticated && (
                                <>
                                <div onClick={signOut}><div className="settings enlarge" /></div>
                                </>
                            )}
                        </li>
                    </ul>
                </nav>

                <div className="show-hide" onClick={() => hideSidebar()} ><div className={isVisible ? 'left_arrow' : 'right_arrow'} /></div>
            </div>
        </>
    );
}

export default Sidebar;