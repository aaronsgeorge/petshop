import React from "react";
import AllProducts from "../components/home/AllProducts";
import HomeCarousel from "../components/home/HomeCarousel";

const HomeScreen = () => {
  return (
    <>
      <HomeCarousel />
      <AllProducts />
    </>
  );
};

export default HomeScreen;
