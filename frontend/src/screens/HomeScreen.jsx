import React from "react";
import AllProducts from "../components/home/AllProducts";
import HomeCarousel from "../components/home/HomeCarousel";
import HomeCatergories from "../components/home/HomeCatergories";

const HomeScreen = () => {
  return (
    <>
      <HomeCarousel />
      <HomeCatergories />
      <AllProducts />
    </>
  );
};

export default HomeScreen;
