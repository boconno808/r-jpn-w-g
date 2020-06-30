import React from "react"
import PropTypes from 'prop-types'
import DocSidebar from "./sidebar"
import "./layout.scss"

const Layout = ({ children }) => {

  return (
    <div
      style={{
        background: `pink`,
        margin: `0 auto`,
        height: `50%`,
        width: `50%`,
        position: `absolute`,
        top: `25%`,
        left: `25%`,
        paddingTop: `2rem`,
        overflow: `auto`,
      }}
    >
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
