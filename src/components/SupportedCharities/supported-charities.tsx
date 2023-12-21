import React from 'react';
import './supported-charities.scss';

const SupportedCharities: React.FC = (props: any) => {
    return (
        <>
            <div className="card">
                <div className="col-lg-12 gedf-main profile-charities">
                    <div className="social-timeline-card">
                        <div className="card-body">
                            <div className="charities-title">
                                <h3>Supported Charities</h3>
                            </div>
                            <div className="charities-list">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        Charity Name
                                    </li>
                                    <li className="list-group-item">
                                        Charity Name
                                    </li>
                                    <li className="list-group-item">
                                        Charity Name
                                    </li>
                                    <li className="list-group-item">
                                        Charity Name
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

export default SupportedCharities;