import React from "react";
import HomeCarousel from "../components/home/HomeCarousel";
import HomeCatergories from "../components/home/HomeCatergories";
import HomePopular from "../components/home/HomePopular";

const HomeScreen = () => {
  return (
    <>
      <HomeCarousel />
      <HomeCatergories />
      <HomePopular />
    </>
  );
};

export default HomeScreen;
