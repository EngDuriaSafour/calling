"use client";
import React from "react";
import Title from "../ui/Title";
import CustomerItem from "./CustomerItem";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextBtn = ({ onClick }) => {
  return (
    <button
      className="absolute -bottom-16 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white z-10 hover:bg-orange-600 transition-all"
      onClick={onClick}
    >
      <IoIosArrowForward />
    </button>
  );
};

const PrevBtn = ({ onClick }) => {
  return (
    <button
      className="absolute -bottom-16 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white mr-2 z-10 hover:bg-orange-600 transition-all"
      onClick={onClick}
    >
      <IoIosArrowBack />
    </button>
  );
};

const Customers = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mt-20 mb-32 px-4">
      <Title addClass="text-[40px] text-center font-dancing mb-10">
        Müşterilerimiz Ne Diyor?
      </Title>
      <Slider {...settings}>
        <CustomerItem imgSrc="/images/client4.jpg" />
        <CustomerItem imgSrc="/images/client3.jpg" />
        <CustomerItem imgSrc="/images/client4.jpg" />
        <CustomerItem imgSrc="/images/client3.jpg" />
      </Slider>
    </div>
  );
};

export default Customers;