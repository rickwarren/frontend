import React from 'react'
import { AuthProvider } from "../../providers/AuthProvider"
import Content from "../Content/content"
import Header from "../Header/header"

const Layout = (props: any) => {
    return (
          <AuthProvider>
            <Header />
            <Content />
          </AuthProvider>
    )
  }
  
  export default Layout