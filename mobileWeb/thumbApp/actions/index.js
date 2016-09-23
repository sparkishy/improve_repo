import fetch from 'isomorphic-fetch'
import $ from 'jquery'

let nextTodoId = 0;
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

/////lets do add image one by one first and lets async fetch after that
let imageID = 0;
export const addImage = (image) => {
  return {
    type: 'ADD_IMAGE',
    id: imageID++,
    image
  }
}

function receiveImages(json)
{
  return {
    type: 'RECEIVE_IMAGES',
    images: json
  }
}

function fetchImages() {
  return dispatch => {  
    return fetch(`http://itymall.com/index.php/mobile/productShow`)
      .then(response => response.json())
      .then(json => {
        //json.data.children.map(child => console.log(child.data))
        console.log(json[0]);
        var arr = [];
        json.map(function(val){
            dispatch(addImage(val.mainImage));
          })
        
        //dispatch(receiveImages(arr))
              
            })
  }
}

export function fetchStep() {
  return (dispatch) => {
    return dispatch(fetchImages())
  }
}

//function fetchPosts() {
//  return dispatch => {
//    dispatch(requestPosts(subreddit))
//    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
//      .then(response => response.json())
//      .then(json => dispatch(receivePosts(subreddit, json)))
//  }
//}