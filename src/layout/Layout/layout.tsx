import React from 'react'
import Content from "../Content/content"
import Header from "../Header/header"

const Layout = (props: any) => {
    return (
      <div className="layout-wrapper">
            <Header />
            <Content />
      </div>
    )
  }
  
  export default Layout