import React from 'react';
import './corporate-sponsors.scss';

const CorporateSponsors: React.FC = (props: any) => {
    return (
        <>
            <div className="corporate-sponsors card">
                <div className="col-lg-12 gedf-main profile-sponsors">
                    <div className="social-timeline-card">
                        <div className="card-body">
                            <div className="charities-title">
                                <h3>Corporate Sponsors</h3>
                            </div>
                            <div className="charities-list">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" height="50" />
                                    </li>
                                    <li className="list-group-item">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Pepsi_logo_%282014%29.svg" height="50" />
                                    </li>
                                    <li className="list-group-item">
                                        <img src="https://www.rsg-global.com/wp-content/uploads/2021/05/walmart.png" height="50" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CorporateSponsors;