import React from "react";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/CameraStyle";

const CameraComp = ({ showModal, cameraProps }) => {
  const { setCamera, takePhoto, type, toggleCameraType } = cameraProps;

  const snapPhoto = () => {
    takePhoto();
    showModal();
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera} type={type}>
        <TouchableOpacity style={styles.snapBtn} onPress={() => snapPhoto()}>
          <View style={styles.snapBtnCircle}></View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reverseBtn}
          onPress={() => toggleCameraType()}
        >
          <MaterialIcons name="flip-camera-android" size={30} color="#fff" />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraComp;
