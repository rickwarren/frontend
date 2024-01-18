import React from 'react'
import { useRouteLoaderData } from 'react-router-typesafe';
import { SearchResultsDto } from '../../services/api/search/dto/search-results.dto';
import { Post } from '../../components/Post';

export const SearchResultsPosts = () => {
    const results: SearchResultsDto = useRouteLoaderData('seach') as SearchResultsDto;
    return results.posts ? results.posts?.map((post: any) => {
        return (
            <div key={post.id} className="post-wrapper">
                <Post post={post} />
            </div>
        )
    }) : ''
}