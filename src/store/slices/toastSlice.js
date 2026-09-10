export const toastInitialState = {
  toasts: [],
}

export const toastReducer = (state, action) => {
  switch (action.type) {
    case 'toast/push':
      return { ...state, toasts: [...state.toasts, { id: crypto.randomUUID(), ...action.payload }] }
    case 'toast/dismiss':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload.id) }
    default:
      return state
  }
}
