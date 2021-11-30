import React from "react"
import "./Button.style.css"

const Button = ({ content, type, setSelectTransactionType }) => {
  return (
    <>
      <button
        type={type}
        className="button"
        onClick={() => setSelectTransactionType(content.toLowerCase())}>
        {content}
      </button>
    </>
  )
}

export default React.memo(Button)
