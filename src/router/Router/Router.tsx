import { Routes, Route, useNavigation, useNavigate, createBrowserRouter, redirect, LoaderFunction } from 'react-router-dom';
import { useRoutePaths } from '../../hooks'
import { Events, Feed, Friends, Groups, Login, NoMatch } from '../../pages'
import { PrivateRoute } from '../PrivateRoute'
import { PublicRoute } from '../PublicRoute'
import { ProfileAbout, ProfileActivity, ProfileFriends, ProfilePhotos, ProfileVideos } from '../../components'
import { ProfileFollowers } from '../../components/ProfileFollowers'
import { ProfileFollowing } from '../../components/ProfileFollowing'
import React from 'react'
import Profile from '../../pages/Profile/profile';
import MyProfile from '../../pages/MyProfile/myprofile';
import App from '../../App'
import Register from '../../pages/Register/Register';
import SearchResults from '../../pages/SearchResults/search-results'
import { useFetchCurrentUserQuery } from '../../features/api/api-slice';
import { getCurrentUser, getUsers } from '../../services/api/user';
import { userLoader } from './loaders/user-loader';
import { feedPostsLoader } from './loaders/feed-posts-loader';
import { myprofileActivityPostsLoader } from './loaders/myprofile-activity-posts-loader';
import { myprofileFriendsLoader } from './loaders/myprofile-friends-loader';
import { profileUserLoader } from './loaders/profile-user-loader';
import { profileFriendsLoader } from './loaders/profile-friends-loader';
import { searchAllLoader } from './loaders/search-all-loader';
import { SearchResultsAll } from '../../pages/SearchResults/all';
import { SearchResultsPeople } from '../../pages/SearchResults/people';
import { SearchResultsPosts } from '../../pages/SearchResults/posts';
import { SearchResultsCharities } from '../../pages/SearchResults/charities';
import { SearchResultsSponsors } from '../../pages/SearchResults/sponsors';
import { profileActivityPostsLoader } from './loaders/profile-activity-posts-loader';

  const {
    FEED_PATH,
    LOGIN_PATH,
    REGISTER_PATH,
    PROFILE_PATH,
    USER_PROFILE_PATH,
    PROFILE_ACTIVITY_PATH,
    PROFILE_ABOUT_PATH,
    PROFILE_FRIENDS_PATH,
    PROFILE_PHOTOS_PATH,
    PROFILE_VIDEOS_PATH,
    SEARCH_RESULTS_PATH,
    SEARCH_RESULTS_ALL_PATH,
    SEARCH_RESULTS_PEOPLE_PATH,
    SEARCH_RESULTS_POSTS_PATH,
    SEARCH_RESULTS_CHARITIES_PATH,
    SEARCH_RESULTS_SPONSORS_PATH
  } = useRoutePaths()

    const router = createBrowserRouter([
      {
        id: 'root',
        path: "/",
        element: <PrivateRoute redirectTo={LOGIN_PATH}>
            <App />
          </PrivateRoute>,
        loader: userLoader,
        children: [
          {
            id: 'friend-posts',
            index: true,
            element: <PrivateRoute redirectTo={LOGIN_PATH}>
                <Feed/>
              </PrivateRoute>,
            loader: feedPostsLoader,
          },
          {
            id: 'feed-path',
            path: FEED_PATH,
            element: <PrivateRoute redirectTo={LOGIN_PATH}>
                <Feed/>
              </PrivateRoute>,
          },
          {
            id: 'login',
            path: LOGIN_PATH,
            element: <PublicRoute>
                <Login />
              </PublicRoute>,
          },
          {
            id: 'register',
            path: REGISTER_PATH,
            element: <PublicRoute>
                <Register />
              </PublicRoute>,
          },
          {
            id: 'user',
            path: PROFILE_PATH,
            element: <PrivateRoute redirectTo={LOGIN_PATH}>
                <MyProfile />
              </PrivateRoute>,
            loader: userLoader,
            children: [
              {
                id: 'myprofile-activity',
                index: true,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileActivity />
                  </PrivateRoute>,
                loader: myprofileActivityPostsLoader,
              },
              {
                id: 'myprofile-activity-path',
                path: PROFILE_ACTIVITY_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileActivity />
                  </PrivateRoute>
              },
              {
                id: 'myprofile-about-path',
                path: PROFILE_ABOUT_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileAbout />
                  </PrivateRoute>
              },
              {
                id: 'myprofile-friends',
                path: PROFILE_FRIENDS_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileFriends />
                  </PrivateRoute>,
                loader: myprofileFriendsLoader,
              },
              {
                id: 'myprofile-photos-path',
                path: PROFILE_PHOTOS_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfilePhotos />
                  </PrivateRoute>
              },
              {
                id: 'myprofile-videos-path',
                path: PROFILE_VIDEOS_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileVideos />
                  </PrivateRoute>
              },
            ]
          },
          {
            id: 'profile-user',
            path: USER_PROFILE_PATH,
            element: <PrivateRoute redirectTo={LOGIN_PATH}>
                <Profile />
              </PrivateRoute>,
            loader: profileUserLoader,
            children: [
              {
                id: 'profile-activity',
                index: true,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileActivity />
                  </PrivateRoute>,
                loader: profileActivityPostsLoader,
              },
              {
                id: 'profile-activity-path',
                path: PROFILE_ACTIVITY_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileActivity />
                  </PrivateRoute>
              },
              {
                id: 'profile-about-path',
                path: PROFILE_ABOUT_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileAbout />
                  </PrivateRoute>
              },
              {
                id: 'profile-friends',
                path: PROFILE_FRIENDS_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileFriends />
                  </PrivateRoute>,
                loader: profileFriendsLoader,
              },
              {
                id: 'profile-photos-path',
                path: PROFILE_PHOTOS_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfilePhotos />
                  </PrivateRoute>
              },
              {
                id: 'profile-videos-path',
                path: PROFILE_VIDEOS_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <ProfileVideos />
                  </PrivateRoute>
              },
            ]
          },
          {
            id: 'search',
            path: SEARCH_RESULTS_PATH,
            element: <PrivateRoute redirectTo={LOGIN_PATH}>
                <SearchResults />
              </PrivateRoute>,
            loader: searchAllLoader,
            children: [
              {
                index: true,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <SearchResultsAll />
                  </PrivateRoute>,
              },
              {
                path: SEARCH_RESULTS_ALL_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <SearchResultsAll />
                  </PrivateRoute>
              },
              {
                path: SEARCH_RESULTS_PEOPLE_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <SearchResultsPeople />
                  </PrivateRoute>,
              },
              {
                path: SEARCH_RESULTS_POSTS_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <SearchResultsPosts />
                  </PrivateRoute>,
              },
              {
                path: SEARCH_RESULTS_CHARITIES_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <SearchResultsCharities />
                  </PrivateRoute>
              },
              {
                path: SEARCH_RESULTS_SPONSORS_PATH,
                element: <PrivateRoute redirectTo={LOGIN_PATH}>
                    <SearchResultsSponsors />
                  </PrivateRoute>,
              },
            ]
          },
        ], 
      },
    ]);

export default router
