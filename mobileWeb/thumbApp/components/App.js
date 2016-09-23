import React, {Component} from 'react'
import { connect } from 'react-redux'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import AddImages from '../containers/AddImages'
import VisibleTodoList from '../containers/VisibleTodoList'
import VisibleImageList from '../containers/VisibleImageList'
import { fetchImages, fetchStep } from '../actions'
//
//const App = () => (
//  <div>
//    <AddTodo />
//    <VisibleTodoList />
//    <Footer />
//    
//    <AddImages />
//    <VisibleImageList />
//  </div>
//)
//
//export default App



///////changing to class type

class App extends Component {
    constructor() {
        super();      
    }
    componentDidMount() {
        
        this.props.dispatch(fetchStep());
    }
    render() {
        return (
    <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    
    <AddImages />
    <VisibleImageList />
    </div>
    );
    }
}

export default connect()(App)