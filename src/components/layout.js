import React from "react"
import PropTypes from 'prop-types'
import GlobalContextProvider from "../context/GlobalContextProvider"

import DocSidebar from "./sidebar"
import "./layout.scss"

const Layout = ({ children }) => {

  return (
    <GlobalContextProvider>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: '100%',
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
      </div>
    </GlobalContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
