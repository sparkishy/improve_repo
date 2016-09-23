import React from 'react'
import { connect } from 'react-redux'
import { addImage } from '../actions'


const onAddImage = () => {
  
  
}

let AddImages = ({ dispatch }) => {
  let input

  return (
    <div>
     
        <button onClick = {() => { dispatch(addImage("http://itymall.com/mainAssets/images/bg1.jpg"))}}>
          Add Images
        </button>
     
    </div>
  )
}
AddImages = connect()(AddImages)

export default AddImages