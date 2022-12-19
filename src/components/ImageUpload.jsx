import { useState, useEffect } from 'react'

const ImageUpload = ({ src }) => {
  
    return (
      <>
      <ReactCrop crop={crop} onChange={c => setCrop(c)} aspect={1} circularCrop={true}>
       {image && <img src={url} /> }
      </ReactCrop>
      </>
    )
  
}


export default ImageUpload