export const authInitialState = {
  isAuthenticated: false,
  email: null,
  profile: null,
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'auth/loggedIn':
      return { ...state, isAuthenticated: true, email: action.payload.email }
    case 'auth/loggedOut':
      return { ...authInitialState }
    case 'auth/profileLoaded':
      return { ...state, profile: action.payload }
    default:
      return state
  }
}
