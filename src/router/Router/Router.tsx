import { Routes, Route } from 'react-router-dom'
import { useRoutePaths } from '@/hooks'
import { Events, Feed, Friends, Groups, Login, NoMatch, Profile, Register } from '@/pages'
import { PrivateRoute } from '../PrivateRoute'
import { PublicRoute } from '../PublicRoute'
import { ProfileActivity, ProfileFriends, ProfilePhotos, ProfileVideos } from '@/components'


function Router() {
  const {
    FEED_PATH,
    LOGIN_PATH,
    REGISTER_PATH,
    PROFILE_PATH,
    PROFILE_ACTIVITY_PATH,
    PROFILE_FRIENDS_PATH,
    PROFILE_PHOTOS_PATH,
    PROFILE_VIDEOS_PATH,
    FRIENDS_PATH,
    GROUPS_PATH,
    EVENTS_PATH
  } = useRoutePaths()

  return (
    <Routes>
      <Route
        index
        element={
          <PrivateRoute redirectTo={LOGIN_PATH}>
            <Feed />
          </PrivateRoute>
        }
      />
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
          <PrivateRoute permissions={['profile.view']} redirectTo={LOGIN_PATH}>
            <Profile />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute permissions={['profile.view']} redirectTo={LOGIN_PATH}>
              <ProfileActivity />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_ACTIVITY_PATH}
          element={
            <PrivateRoute permissions={['profile.view']} redirectTo={LOGIN_PATH}>
              <ProfileActivity />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_FRIENDS_PATH}
          element={
            <PrivateRoute permissions={['profile.view']} redirectTo={LOGIN_PATH}>
              <ProfileFriends />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_PHOTOS_PATH}
          element={
            <PrivateRoute permissions={['profile.view']} redirectTo={LOGIN_PATH}>
              <ProfilePhotos />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_VIDEOS_PATH}
          element={
            <PrivateRoute permissions={['profile.view']} redirectTo={LOGIN_PATH}>
              <ProfileVideos />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route
        path={FRIENDS_PATH}
        element={
          <PrivateRoute permissions={['profile.view']}>
            <Friends />
          </PrivateRoute>
        }
      />
      <Route
        path={GROUPS_PATH}
        element={
          <PrivateRoute permissions={['groups.view']}>
            <Groups />
          </PrivateRoute>
        }
      />
      <Route
        path={EVENTS_PATH}
        element={
          <PrivateRoute permissions={['events.view']}>
            <Events />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}

export default Router
