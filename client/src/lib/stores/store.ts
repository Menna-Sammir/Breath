import CounterStore from "./counterStore";
import { createContext, useContext } from "react";
import { UiStore } from "./uiStore";

interface Store {
  counterStore: CounterStore;
  uiStore: UiStore;
}

export const store: Store = {
  counterStore: new CounterStore(),
  uiStore: new UiStore(),
};

export const storesContext = createContext(store);

export function useStore() {
  return useContext(storesContext);
}
