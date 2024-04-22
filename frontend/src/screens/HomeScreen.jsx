import React from "react";
import HomeCarousel from "../components/home/HomeCarousel";
import HomeCatergories from "../components/home/HomeCatergories";
import HomePopular from "../components/home/HomePopular";
import HomeSales from "../components/home/HomeSales";

const HomeScreen = () => {
  return (
    <>
      <HomeCarousel />
      <HomeCatergories />
      <HomePopular />
      <HomeSales />
    </>
  );
};

export default HomeScreen;
