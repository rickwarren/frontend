import {
  BrowserRouter,
  RouterProvider
} from "react-router-dom";
import AuthProvider from './providers/AuthProvider/AuthProvider';
import { Content } from "./layout/Content";
import Header from "./layout/Header/header";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import router from "./router/Router/Router";
import Layout from "./layout/Layout/layout";

function App() {
  return (
    <>
      <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <Layout />
            </AuthProvider>
          </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
