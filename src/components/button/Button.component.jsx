import React from "react"
import "./Button.style.css"

const Button = ({ content, type, setSelectTransactionType, isLoading }) => {
  return (
    <>
      <button
        disabled={isLoading}
        type={type}
        className="button"
        onClick={() =>
          !isLoading && setSelectTransactionType(content.toLowerCase())
        }>
        {content}
      </button>
    </>
  )
}

export default React.memo(Button)
