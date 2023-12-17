import React from 'react';

const ProfileCarousel: React.FC = (props: any) => {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">Latest Photos</h3>
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className=""></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1" className=""></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2" className="active"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="d-block w-100" alt="..."/>
                            </div>
                            <div className="carousel-item active">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileCarousel;