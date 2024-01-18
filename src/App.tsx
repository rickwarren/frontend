import {
  BrowserRouter
} from "react-router-dom";
import AuthProvider from './providers/AuthProvider/AuthProvider';
import { Content } from "./layout/Content";
import Header from "./layout/Header/header";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <Content />
        </AuthProvider>
      </Provider>
    </>
  )
}

export default App
