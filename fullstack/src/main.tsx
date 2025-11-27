import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";
import { store } from './store';

const basename = import.meta.env.BASE_URL === './' ? '/' : import.meta.env.BASE_URL;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
