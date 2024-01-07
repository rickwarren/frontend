import {
  BrowserRouter
} from "react-router-dom";
import AuthProvider from './providers/AuthProvider/AuthProvider';
import { Content } from "./layout/Content";
import Header from "./layout/Header/header";
import React from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Content />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
