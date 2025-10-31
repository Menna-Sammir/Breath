import { useContext } from "react";
import { storesContext } from "../stores/store";

export function useStore() {
  return useContext(storesContext);
}
