import React from "react";
import { useStateDispatch } from "./AppState";
import classes from "./Pizza.module.css";
interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Props {
  pizza: Pizza;
}

const Pizza: React.FC<Props> = ({ pizza }) => {
  const dispatch = useStateDispatch();

  const handleAddToCartAction = () => {
    const { id, price, name } = pizza;
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item: {
          id,
          name,
          price
        }
      }
    });
  };
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

export default Pizza;
