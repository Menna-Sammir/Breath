import axios from "axios";
import { store } from "../stores/store";

export const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

agent.interceptors.request.use((config) => {
  store.uiStore.isBusy();
  return config;
});

agent.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    store.uiStore.isIdle();
    return response;
  } catch (error) {
    console.error("Error occurred while sleeping:", error);
    // Re-throw so the interceptor returns a rejected promise instead of undefined
    throw error;
  } finally {
    store.uiStore.isIdle();
  }
});

// agent.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors, e.g., redirect to login
//       console.error("Unauthorized! Redirecting to login...");
//     }
//     return Promise.reject(error);
//   }
// );

export default agent;
