import React, { useState } from "react";
import { CameraType } from "expo-camera";

const CameraHooks = () => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  function toggleCameraType() {
    setType((prevState) =>
      prevState === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return {
    camera,
    setCamera,
    photo,
    setPhoto,
    takePhoto,
    type,
    toggleCameraType,
    setType,
  };
};

export default CameraHooks;
