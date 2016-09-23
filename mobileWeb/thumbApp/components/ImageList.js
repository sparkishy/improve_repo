import React, { PropTypes } from 'react'
import Image from './Image'

const ImageList = ({ images }) => (
  <div>
    {images.map(image =>
      <Image
        key={image.id}
        {...image}
      />
    )}
  </div>
)

ImageList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default ImageList