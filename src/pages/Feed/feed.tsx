import React from 'react';
import './feed.scss';
import { useSession } from '../../hooks';
import { Dropdown, MenuProps, Space } from 'antd';

    const onClick: MenuProps['onClick'] = ({ key }) => {
        console.log('click ', key);
    };


const items: MenuProps['items'] = [
    {
      label: 'Save',
      key: '0',
    },
    {
      label: 'Hide',
      key: '1',
    },
    {
      label: 'Report',
      key: '3',
    },
];  

const Feed: React.FC = (props: any) => {
    const { user } = useSession();

    return (
        <>
            <div className="row">
                <div className="col-lg-5">
                    <div className="card">
                        
                    </div>
                </div>
                <div className="col-lg-7 gedf-main">
                    <div className="card social-timeline-card">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Share your insights</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images">Share Images</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade active show" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                    <div className="form-group">
                                        <textarea className="form-control" id="message" rows={3} placeholder="What are you thinking?"></textarea>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                                    <div className="form-group">
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="customFile"/>
                                        </div>
                                    </div>
                                    <div className="py-4"></div>
                                </div>
                            </div>
                            <div className="btn-toolbar justify-content-between">
                                <div className="btn-group">
                                    <button type="submit" className="btn btn-theme-primary">share</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="card social-timeline-card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mr-2">
                                        <img className="rounded-circle" width="45" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                                    </div>
                                    <div className="ml-2">
                                        <div className="h5 m-0 text-blue">@JaneSmith</div>
                                        <div className="text-muted h7"><i className="fa fa-clock-o"></i>10 min ago</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="btn-group">
                                        <Dropdown menu={{ items, onClick }} trigger={['click']}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    <button id="btnGroupDrop1" type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="fa fa-ellipsis-h"></i>
                                                    </button>
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <a className="card-link" href="#/">
                                <h5 className="card-title">Lorem ipsum dolor sit amet, consectetur adip.</h5>
                            </a>
                            <img src="img/gallery/1a.jpg" alt="" className="img-fluid"/>

                        </div>
                        <div className="card-footer">
                            <a href="#/" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                            <a href="#/" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                            <a href="#/" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                        </div>
                    </div>
                    
                    
                    <div className="card social-timeline-card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mr-2">
                                        <img className="rounded-circle" width="45" src="https://bootdey.com/img/Content/avatar/avatar2.png" alt=""/>
                                    </div>
                                    <div className="ml-2">
                                        <div className="h5 m-0 text-blue">@JaneSmith</div>
                                        <div className="text-muted h7"><i className="fa fa-clock-o"></i>10 min ago</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="btn-group">
                                        <Dropdown menu={{ items, onClick }} trigger={['click']}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    <button id="btnGroupDrop1" type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="fa fa-ellipsis-h"></i>
                                                    </button>
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <a className="card-link" href="#/">
                                <h5 className="card-title"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit consectetur
                                                deserunt illo esse distinctio.</h5>
                            </a>
                            <p className="card-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam omnis nihil, aliquam est, voluptates officiis iure soluta alias vel odit, placeat reiciendis ut libero! Quas aliquid natus cumque quae repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, excepturi. Doloremque, reprehenderit! Quos in maiores, soluta doloremque molestiae reiciendis libero expedita assumenda fuga quae. Consectetur id molestias itaque facere? Hic!
                            </p>
                            <div>
                                <span className="badge badge-primary">JavaScript</span>
                                <span className="badge badge-primary">Android</span>
                                <span className="badge badge-primary">PHP</span>
                                <span className="badge badge-primary">Node.js</span>
                                <span className="badge badge-primary">Ruby</span>
                                <span className="badge badge-primary">Paython</span>
                            </div>
                        </div>
                        <div className="card-footer">
                            <a href="#/" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                            <a href="#/" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                            <a href="#/" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                        </div>
                    </div>
                
                    <div className="card social-timeline-card">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mr-2">
                                        <img className="rounded-circle" width="45" src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/>
                                    </div>
                                    <div className="ml-2">
                                        <div className="h5 m-0 text-blue">@JaneSmith</div>
                                        <div className="text-muted h7"><i className="fa fa-clock-o"></i>40 min ago</div>
                                    </div>
                                </div>
                                <div>
                                <div className="btn-group">
                                        <Dropdown menu={{ items, onClick }} trigger={['click']}>>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    <button id="btnGroupDrop1" type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="fa fa-ellipsis-h"></i>
                                                    </button>
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <a className="card-link" href="#/">
                                <h5 className="card-title">Totam non adipisci hic! Possimus ducimus amet, dolores illo ipsum quos
                                                cum.</h5>
                            </a>
                            <p className="card-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sunt fugit reprehenderit consectetur exercitationem odio, quam nobis? Officiis, similique, harum voluptate, facilis voluptas pariatur dolorum tempora sapiente eius maxime quaerat.
                                <a href="https://mega.nz/#!1J01nRIb!lMZ4B_DR2UWi9SRQK5TTzU1PmQpDtbZkMZjAIbv97hU" target="_blank">https://mega.nz/#!1J01nRIb!lMZ4B_DR2UWi9SRQK5TTzU1PmQpDtbZkMZjAIbv97hU</a>
                            </p>
                        </div>
                        <div className="card-footer">
                            <a href="#/" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                            <a href="#/" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                            <a href="#/" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                        </div>
                    </div>              
                </div>
            </div>
        </>
    );
}

export default Feed;