import CounterStore from "./counterStore";
import { createContext, useContext } from "react";
import { UiStore } from "./uiStore";
import { ActivityStore } from "./activityStore";

interface Store {
  counterStore: CounterStore;
  uiStore: UiStore;
  activityStore: ActivityStore;
}

export const store: Store = {
  counterStore: new CounterStore(),
  uiStore: new UiStore(),
  activityStore: new ActivityStore(),
};

export const storesContext = createContext(store);

export function useStore() {
  return useContext(storesContext);
}
