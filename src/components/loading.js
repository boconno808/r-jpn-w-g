import React from "react"

export default function Loading({ loadState }) {
  return (
    <div>
      <div
      className="ui active huge text inline center loader"
      >
      { loadState }
      </div>
    </div>
  )
}
