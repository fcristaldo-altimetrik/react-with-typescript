import React from "react";
import { AddToCartProps, useAddToCart, withAddToCartHOC } from "./AddToCartHOC";
import classes from "./Pizza.module.css";
import { Pizza } from "./types";

interface Props  {
  pizza: Pizza;
}

const PizzaItem: React.FC<Props> = ({ pizza }) => {
  const addToCart = useAddToCart();
  const handleAddToCartAction=()=>{
    addToCart({id:pizza.id,price:pizza.price,name:pizza.name})
  }
  return (
    <li className={classes.container}>
      <h1>{pizza.name}</h1>
      <p>{pizza.description}</p>
      <p> {pizza.price} </p>
      <button type="button" onClick={handleAddToCartAction}>
        Add to Cart
      </button>
    </li>
  );
};

export default PizzaItem;
