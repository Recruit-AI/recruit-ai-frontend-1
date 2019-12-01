import React from 'react'
import ImageModal from './imageModal'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const item = this.props.item

    const images = item.images
    const thumbnail = item.thumbnail
    const galleryImages = [thumbnail, ...images]
    return <div><div class="divider" /><div className="image-gallery">
        

        <h4>Image Gallery:</h4>
        <p>Click for larger & more info</p>
        <div className="image-slider" style={{display:'flex'}} >
          { Array.isArray(galleryImages) ? galleryImages.map(
              image => image ? <span key={image.image_title}>
                <ImageModal key={image.image_id} item={image} />
              </span> : ""
            )  : "" }
        </div>
        </div>
        <div class="reverse-divider" />
    </div>
  }
}

export default Gallery
