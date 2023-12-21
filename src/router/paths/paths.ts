const FEED_PATH = '/feed'
const LOGIN_PATH = '/login'
const PROFILE_PATH = '/myprofile'
const USER_PROFILE_PATH = "/profile/:slug"
const PROFILE_ACTIVITY_PATH = 'activity'
const PROFILE_ABOUT_PATH = 'about'
const PROFILE_FRIENDS_PATH = 'friends'
const PROFILE_PHOTOS_PATH = 'photos'
const PROFILE_VIDEOS_PATH = 'videos'
const PROFILE_FOLLOWERS_PATH = 'followers'
const PROFILE_FOLLOWING_PATH = 'following'
const FRIENDS_PATH = '/friends'
const GROUPS_PATH = '/groups'
const EVENTS_PATH = '/events'

const paths = {
  FEED_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  USER_PROFILE_PATH,
  PROFILE_ACTIVITY_PATH,
  PROFILE_ABOUT_PATH,
  PROFILE_FRIENDS_PATH,
  PROFILE_PHOTOS_PATH,
  PROFILE_VIDEOS_PATH,
  PROFILE_FOLLOWERS_PATH,
  PROFILE_FOLLOWING_PATH,
  FRIENDS_PATH,
  GROUPS_PATH,
  EVENTS_PATH
} as const

export default paths
