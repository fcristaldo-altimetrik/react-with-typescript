import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";

interface AppStateValue {
  cart: {
    items: CartItem[];
  };
}
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const defaultState: AppStateValue = {
  cart: {
    items: []
  }
};

export const AppStateContext = createContext(defaultState);
export const AppDispatchContext = createContext<
  React.Dispatch<AddToCartAction> | undefined
>(undefined);
interface Action<T> {
  type: T;
}
interface AddToCartAction extends Action<"ADD_TO_CART"> {
  payload: {
    item: Omit<CartItem, "quantity">;
  };
}
interface InitializeCartAction extends Action<"INITIALIZE_CART">{
  payload:{
    cart:AppStateValue['cart']
  }
}

const reducer = (state: AppStateValue, action: AddToCartAction | InitializeCartAction) => {
  if (action.type === "ADD_TO_CART") {
    const itemToAdd = action.payload.item;
    const itemExists = state.cart.items.find(
      (item) => item.id === itemToAdd.id
    );
    return {
      ...state,
      cart: {
        ...state.cart,
        items: itemExists
          ? state.cart.items.map((item) => {
              if (item.id === itemToAdd.id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
          : [...state.cart.items, { ...itemToAdd, quantity: 1 }]
      }
    };
  }else if(action.type === "INITIALIZE_CART"){
    return {...state,cart:action.payload.cart}
  }
  return state;
};

export const useStateDispatch = () => {
  const setState = useContext(AppDispatchContext);
  if (!setState) {
    throw new Error("useStateDispatch was called outside of the context");
  }
  return setState;
};
const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  
  useEffect(() => {
    const cart = window.localStorage.getItem("cart")
    if (cart){
      dispatch({type:"INITIALIZE_CART",payload:{cart:JSON.parse(cart)}})
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};
export default AppStateProvider;
