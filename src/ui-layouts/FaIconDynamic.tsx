import React from "react";
import {
  FaUserAlt,
  FaBook,
  FaShoppingCart,
  FaHeart,
  FaUserLock,
  FaUndoAlt,
  FaUserCircle,
} from "react-icons/fa";

const FaIconDynamic = ({ type }: any) => {
  const FaIcon = components[type as keyof typeof components];
  return <FaIcon></FaIcon>;
};

const components = {
  FaUserAlt,
  FaBook,
  FaShoppingCart,
  FaHeart,
  FaUserLock,
  FaUndoAlt,
  FaUserCircle,
};

export default FaIconDynamic;