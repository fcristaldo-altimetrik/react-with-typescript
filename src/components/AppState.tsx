import React, { createContext, useContext, useState } from "react";

interface AppStateValue {
  cart: {
    items: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[];
  };
}

const defaultState: AppStateValue = {
  cart: {
    items: []
  }
};

export const AppStateContext = createContext(defaultState);
export const AppSetStateContext = createContext<
  React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined);

export const useSetState = () => {
  const setState = useContext(AppSetStateContext);
  if (!setState) {
    throw new Error("useSetState was called outside of the context");
  }
  return setState;
};
const AppStateProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(defaultState);
  return (
    <AppSetStateContext.Provider value={setState}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppSetStateContext.Provider>
  );
};
export default AppStateProvider;
