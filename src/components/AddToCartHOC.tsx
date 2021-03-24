import React from "react";
import { useStateDispatch, CartItem } from "./AppState";

export interface AddToCartProps {
  addToCart: (item: Omit<CartItem, "quantity">) => void;
}
export function withAddToCartHOC<OriginalProps extends AddToCartProps>(
  ChildComponent: React.ComponentType<OriginalProps>
) {
  const AddToCartHOC = (props: Omit<OriginalProps, keyof AddToCartProps>) => {
    const dispatch = useStateDispatch();

    const handleAddToCartAction: AddToCartProps["addToCart"] = (item) => {
      const { id, price, name } = item;
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
      <ChildComponent
        {...(props as OriginalProps)}
        addToCart={handleAddToCartAction}
      />
    );
  };

  return AddToCartHOC;
}

export const WithAddToCartProps: React.FC<{children:(props:AddToCartProps)=>JSX.Element}> = ({ children }) => {
  const dispatch = useStateDispatch();
  const addToCart: AddToCartProps["addToCart"] = (item) => {
    const { id, price, name } = item;
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
  return children({addToCart})
};

export const useAddToCart = () =>{
  const dispatch = useStateDispatch();
  const addToCart: AddToCartProps["addToCart"] = (item) => {
    const { id, price, name } = item;
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
  return addToCart;
}