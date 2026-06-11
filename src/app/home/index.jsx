import React from "react";
import Carousel from "../components/carousel";
import Campaigns from "../components/campaigns";
import MenuWrapper from "../components/product/MenuWrapper";
import About from "../components/About";
import Reservation from "../components/Reservation";
import Customers from "../components/customers/Customers";

const Index = ({ categoryList, productList }) => {
  return (
    <React.Fragment>
      <Carousel />
      <Campaigns />
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About />
      <Reservation />
      <Customers />
    </React.Fragment>
  );
};

export default Index;