import React, { useContext } from "react";
import { AppSetStateContext, useSetState } from "./AppState";
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
  const setState = useSetState();

  const handleAddToCartAction = () => {
    setState((state) => {
      const itemExists = state.cart.items.find((item) => item.id === pizza.id);
      return {
        ...state,
        cart: {
          ...state.cart,
          items: itemExists
            ? state.cart.items.map((item) => {
                if (item.id === pizza.id) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              })
            : [
                ...state.cart.items,
                {
                  id: pizza.id,
                  name: pizza.name,
                  price: pizza.price,
                  quantity: 1
                }
              ]
        }
      };
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
