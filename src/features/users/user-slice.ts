import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../api/api-slice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => '/users/current',
      transformResponse: (res: any) => {
        return usersAdapter.setAll(initialState, res)
      },
    }),
  }),
})

export const { useGetCurrentUserQuery } = extendedApiSlice

export const selectCurrentUserResult = extendedApiSlice.endpoints.getCurrentUser.select(null);

const selectCurrentUserData = createSelector(
    selectCurrentUserResult,
    (usersResult) => usersResult.data
)

export const {
    selectById: selectCurrentUser,
} = usersAdapter.getSelectors((state: any) => selectCurrentUserData(state) ?? initialState)