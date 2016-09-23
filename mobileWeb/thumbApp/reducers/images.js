const image = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return {
        id: action.id,
        image: action.image
      }
    //case 'TOGGLE_IMAGE':
    //  if (state.id !== action.id) {
    //    return state
    //  }
    //
    //  return Object.assign({}, state, {
    //    completed: !state.completed
    //  })

    default:
      return state
  }
}

const images = (state = [], action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return [
        ...state,
        image(undefined, action)
      ]
    case 'RECEIVE_IMAGES':
      return Object.assign({}, state, {
        images: action.images
      })
    //////case 'TOGGLE_TODO':
    //////  return state.map(t =>
    //////    todo(t, action)
    //////  )
    default:
      return state
  }
}

export default images