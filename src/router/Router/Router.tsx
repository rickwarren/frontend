import { Routes, Route } from 'react-router-dom'
import { useRoutePaths } from '../../hooks'
import { Feed, Friends, Login, NoMatch, Register } from '../../pages'
import { PrivateRoute } from '../PrivateRoute'
import { PublicRoute } from '../PublicRoute'
import { ProfileActivity, ProfileFriends, ProfilePhotos, ProfileVideos } from '../../components'
import React from 'react'
import MyProfile from '../../pages/MyProfile/myprofile'
import Profile from '../../pages/Profile/profile'
import SearchResults from '../../pages/SearchResults/search-results'
import { SearchResultsAll } from '../../pages/SearchResults/all'
import { SearchResultsPeople } from '../../pages/SearchResults/people'
import { SearchResultsPosts } from '../../pages/SearchResults/posts'
import { SearchResultsCharities } from '../../pages/SearchResults/charities'
import { SearchResultsSponsors } from '../../pages/SearchResults/sponsors'
import { FriendsList } from '../../pages/Friends/friends-list'
import { FriendsOfFriends } from '../../pages/Friends/friends-friends'
import ProfileAbout from '../../components/ProfileAbout/profile-about';
import Videos from '../../pages/Videos/videos'
import { VideosAll } from '../../pages/Videos/all'
import { VideosFriends } from '../../pages/Videos/friends'
import { VideosFriendsOfFriends } from '../../pages/Videos/friends-of-friends'


function Router() {
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
    SEARCH_RESULTS_SPONSORS_PATH,
    FRIENDS_PATH,
    FRIENDS_OF_FRIENDS_PATH,
    VIDEOS_PATH,
    VIDEOS_ALL_PATH,
    VIDEOS_FRIENDS_PATH,
    VIDEOS_FRIENDS_OF_FRIENDS_PATH,
  } = useRoutePaths()



  return (
    <Routes>
      <Route
        path={FEED_PATH}
        element={
          <PrivateRoute redirectTo={LOGIN_PATH}>
            <Feed />
          </PrivateRoute>
        }
      />
      <Route
        path={LOGIN_PATH}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path={REGISTER_PATH} element={<Register />} />
      <Route
        path={PROFILE_PATH}
        element={
          <PrivateRoute redirectTo={LOGIN_PATH}>
            <MyProfile />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileActivity />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_ACTIVITY_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileActivity />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_ABOUT_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileAbout />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_FRIENDS_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileFriends />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_PHOTOS_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfilePhotos />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_VIDEOS_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileVideos />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route
        path={USER_PROFILE_PATH}
        element={
          <PrivateRoute redirectTo={LOGIN_PATH}>
            <Profile />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileActivity />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_ACTIVITY_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileActivity />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_ABOUT_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileAbout />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_ABOUT_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileFriends />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_FRIENDS_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileFriends />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_PHOTOS_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfilePhotos />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_VIDEOS_PATH}
          element={
            <PrivateRoute
              redirectTo={LOGIN_PATH}
            >
              <ProfileVideos />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path={SEARCH_RESULTS_PATH} element={
        <PrivateRoute redirectTo={LOGIN_PATH}>
          <SearchResults />
        </PrivateRoute>
        }
      >
        <Route index element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <SearchResultsAll />
            </PrivateRoute>
          } 
        />
        <Route path={SEARCH_RESULTS_PEOPLE_PATH} element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <SearchResultsPeople />
            </PrivateRoute>
          } 
        />
        <Route path={SEARCH_RESULTS_POSTS_PATH} element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <SearchResultsPosts />
            </PrivateRoute>
          } 
        />
        <Route path={SEARCH_RESULTS_CHARITIES_PATH} element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <SearchResultsCharities />
            </PrivateRoute>
          } 
        />
        <Route path={SEARCH_RESULTS_SPONSORS_PATH} element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <SearchResultsSponsors />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path={FRIENDS_PATH} element={
        <PrivateRoute redirectTo={LOGIN_PATH}>
          <Friends />
        </PrivateRoute>
        }
      >
        <Route index element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <FriendsList />
            </PrivateRoute>
          }
        />
        <Route path={FRIENDS_OF_FRIENDS_PATH} element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <FriendsOfFriends />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path={VIDEOS_PATH} element={
        <PrivateRoute redirectTo={LOGIN_PATH}>
          <Videos />
        </PrivateRoute>
        }
      >
        <Route index element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <VideosAll />
            </PrivateRoute>
          }
        />
        <Route path={VIDEOS_ALL_PATH} element={
          <PrivateRoute redirectTo={LOGIN_PATH}>
              <VideosAll />
            </PrivateRoute>
          }
        />
        <Route path={VIDEOS_FRIENDS_PATH} element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <VideosFriends />
            </PrivateRoute>
          }
        />
        <Route path={VIDEOS_FRIENDS_OF_FRIENDS_PATH} element={
            <PrivateRoute redirectTo={LOGIN_PATH}>
              <VideosFriendsOfFriends />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default Router