import React from 'react'
import { Post } from '../Post'
import ActivityInput from './activity-input'

const MainContent = (props: any) => {
    return (
        <>
            <div className="col-lg-7 gedf-main">
                <ActivityInput />
                <div className="card social-timeline-card newpost">
                    { props.posts ? props.posts?.map((post: any) => {
                        return (
                            <div key={post.id} className="post-wrapper">
                                <Post post={post} retrievePosts={props.retrievePosts} />
                            </div>
                        )
                    }) : ''}
                </div>
            </div>
        </>
    )
}

export default MainContent;