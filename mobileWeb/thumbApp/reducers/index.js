import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import images from './images'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  images
})

export default todoApp