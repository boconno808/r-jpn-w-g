import React from "react"
import PropTypes from 'prop-types'
import DocSidebar from "./sidebar"
import { Helmet } from "react-helmet"
import "./layout.scss"
import SiteTitle from './header'

const Layout = ({ children }) => {

  return (
    <>
    <Helmet>
          <meta charSet="utf-8" />
          <title>Japanese Generator</title>
        </Helmet>
    <div className = "bg">
      <header
      style={{
        padding:`.75rem .5rem .5rem 2rem`,
      }}
      >
        <SiteTitle/>
      </header>
      <div className = "outerDiv">
        <div className = "note">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
