import React, { PropTypes } from 'react'
import classNames from 'classnames';

const Image = ({image}) => (
    <article className="thumb">
        <a
        href={image}
        className="image"
        >
        <img src={image} />
        </a>
        
        <h2>Magna feugiat lorem</h2>
		<p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
    </article>
)

Image.propTypes = {
    image: PropTypes.string.isRequired
}

export default Image

