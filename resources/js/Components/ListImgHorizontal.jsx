import React, { useCallback, useEffect, useRef, useState } from 'react';
import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import { LightGallerySettings } from 'lightgallery/lg-settings';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { render } from 'react-dom';

export default function ListImgHorizontal(props) {
  // const lightGallery = useRef(null);
  const lightGallery = useRef(null);

  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  useEffect(() => {
    const updatedItems = props.capturedImages.map((imageUri, index) => ({
      id: index.toString(),
      src: imageUri,
      thumb: imageUri, 
    }));
    lightGallery.current.refresh(updatedItems);
  }, [props.capturedImages]);

  const openGallery = useCallback((index) => {
    lightGallery.current.openGallery(index);
  }, []);

  const removeImage = useCallback((index) => {
    const updatedImages = props.capturedImages.filter((_, i) => i !== index);
    props.setCapturedImages(updatedImages);
  
    props.setData((prevData) => ({
      ...prevData,
      photo: prevData.photo ? prevData.photo.filter((_, i) => i !== index) : [],
    }));
  }, [props.capturedImages, props.setCapturedImages, props.setData]);
  

  return (
    <div className="flex mx-3 overflow-x-auto whitespace-nowrap">
      {props.capturedImages.map((imageUri, index) => (
        <div key={index} className="relative inline-block mx-1">
          <img
            src={imageUri}
            className="object-cover min-w-20 w-20 h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            onClick={() => openGallery(index)}
          />
          <div
            onClick={() => removeImage(index)}
            className="absolute top-0 -right-1 qp-1 bg-red-500 text-white rounded-full cursor-pointer w-5 h-5 flex items-center justify-center text-xs"
          >
            X
          </div>
        </div>
      ))}
      <LightGallery
        onInit={onInit}
        elementClassNames="custom-classname"
        dynamic
        dynamicEl={props.capturedImages.map((imageUri, index) => ({
          id: index.toString(),
          src: imageUri,
          thumb: imageUri, 
        }))}
        plugins={[lgZoom, lgVideo, lgThumbnail]}
      />
    </div>
  );
}
