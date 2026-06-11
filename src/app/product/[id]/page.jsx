"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../redux/cartSlice";

export default function ProductDetails({ params }) {
  const [food, setFood] = useState(null);
  const [price, setPrice] = useState(0);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
      setFood(res.data);
      setPrice(res.data.prices[0]);
    };
    getProduct();
  }, [params.id]);

  if (!food) return <div>Loading...</div>;

  const handleClick = () => {
    dispatch(addProduct({ ...food, extras, price, quantity: 1 }));
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl">{food.title}</h1>
      <span className="text-2xl font-bold">${price}</span>
      <p>{food.desc}</p>
      <button onClick={handleClick} className="bg-primary text-white p-2 mt-5">Add to Cart</button>
    </div>
  );
}