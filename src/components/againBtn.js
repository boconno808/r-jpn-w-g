import React from "react"

export default function AgainBtn(props) {
  return (
    <button
    className="ui animated vertical red button"
    onClick= {props.onClick}
    onKeyDown= {props.onKeyDown}
    style={{margin: `2rem`}}
    >
      <div className="visible content">Again</div>
      <div className="hidden content">
        引き直す
      </div>
    </button>
  );
}
