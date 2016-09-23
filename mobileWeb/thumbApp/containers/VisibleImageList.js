import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import ImageList from '../components/ImageList'

//const getVisibleTodos = (todos, filter) => {
//  switch (filter) {
//    case 'SHOW_ALL':
//      return todos
//    case 'SHOW_COMPLETED':
//      return todos.filter(t => t.completed)
//    case 'SHOW_ACTIVE':
//      return todos.filter(t => !t.completed)
//  }
//}

const mapStateToProps = (state) => {
  return {
    images: state.images
  }
}

//const mapDispatchToProps = (dispatch) => {
//  return {
//    onTodoClick: (id) => {
//      dispatch(toggleTodo(id))
//    }
//  }
//}

const VisibleImageList = connect(
  mapStateToProps
)(ImageList)

export default VisibleImageList

