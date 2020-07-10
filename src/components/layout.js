import React from "react"
import PropTypes from 'prop-types'
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
      <div
      style={{
        padding:`1rem .5rem .5rem 1rem`,
      }}
      >
        <SiteTitle/>
      </div>
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
