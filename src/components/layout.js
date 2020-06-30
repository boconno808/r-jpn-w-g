import React from "react"
import PropTypes from 'prop-types'
import DocSidebar from "./sidebar"
import "./layout.scss"
import SiteTitle from './header'

const Layout = ({ children }) => {

  return (
    <>
    <div
    style={{
      background: `blue`,
      height: `100%`,
      width: `100%`,
      position: `absolute`,
      overflow: `hidden`,
    }}>
      <SiteTitle/>
        <div
          style={{
            background: `pink`,
            margin: `0 auto`,
            height: `50%`,
            width: `50%`,
            position: `inherit`,
            top: `25%`,
            left: `25%`,
            paddingTop: `2rem`,
            overflow: `auto`,
          }}
        >
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
