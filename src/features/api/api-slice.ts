import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utils';
import { UserDto } from '../../services/api/user/dto/user.dto';
import { PostDto } from '../../services/api/post/dto/post.dto';
import { CommentDto } from '../../services/api/comment/dto/comment.dto';
import { ProfileDto } from '../../services/api/profile/dto/profile.dto';
import { NotificationDto } from '../../services/api/notification/dto/notification.dto';

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
          return `/user/${userId}`;
        },
      }),
      fetchCurrentUser: builder.query<UserDto, void>({
        query() {
          return `/user/current`;
        },
      }),
      fetchUserByUrlString: builder.query<UserDto, string | void>({
        query(userUrlString = '') {
          return `/user/urlString/${userUrlString}`;
        },
      }),
      fetchUsers: builder.query<UserDto[], void>({
        query() {
          return `/user/all`;
        },
      }),
      fetchProfile: builder.query<ProfileDto, string | void>({
        query(profileId = '') {
          return `/profile/${profileId}`;
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
      fetchFriendsList: builder.query<UserDto[], string | void>({
        query(userId = '') {
          return `/friend-list/friends/${userId}`;
        },
      }),
      fetchNotifications: builder.query<NotificationDto[], string | void>({
        query(userId = '') {
          return `/notification/all/${userId}`;
        },
      })
    };
  },
});

export const { 
  useFetchUserQuery, 
  useFetchCurrentUserQuery,
  useFetchUserByUrlStringQuery,
  useFetchUsersQuery, 
  useFetchProfileQuery,
  useFetchPostsQuery, 
  useFetchCommentsQuery,
  useFetchNotificationsQuery } = apiSlice;
