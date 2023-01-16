import React from "react";
import { useState } from "react";

const ModalShow = () => {
  const [isShow, setIsShow] = useState(false);
  const isShowModalToggle = () => {
    setIsShow(!isShow);
  };
  return { isShow, isShowModalToggle };
};

export default ModalShow;
