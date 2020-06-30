import React from "react"

export default function Loading({ loadState }) {
  return (
    <div>
      <div
      className="ui active massive text inline center loader"
      >
      { loadState }
      </div>
    </div>
  )
}
