import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utils';
import { UserDto } from '../../services/api/user/dto/user.dto';
import { PostDto } from '../../services/api/post/dto/post.dto';
import { CommentDto } from '../../services/api/comment/dto/comment.dto';


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders(headers) {
      headers.set('Authorization', 'Bearer ' + getToken());

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchUser: builder.query<UserDto, string | void>({
        query(userId = '') {
          return `/user/urlstring/${userId}`;
        },
      }),
      fetchUsers: builder.query<UserDto[], void>({
        query() {
          return `/user/all`;
        },
      }),
      fetchPosts: builder.query<PostDto[], string | void>({
        query(locationId = '') {
          return `/post/all/${locationId}`;
        },
      }),
      fetchComments: builder.query<CommentDto[], string | void>({
        query(postId = '') {
          return `/comment/post/${postId}`; 
        },
      }),
    };
  },
});

export const { useFetchUserQuery, useFetchUsersQuery, useFetchPostsQuery, useFetchCommentsQuery } = apiSlice;
