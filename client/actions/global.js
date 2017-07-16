export const SET_NUMBER_GLOBAL_LOADING = 'SET_NUMBER_GLOBAL_LOADING'

export const startGlobalLoading = () => ({
  type: SET_NUMBER_GLOBAL_LOADING,
  change: 1,
})

export const stopGlobalLoading = () => ({
  type: SET_NUMBER_GLOBAL_LOADING,
  change: -1,
})
