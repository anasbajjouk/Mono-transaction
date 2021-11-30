import React from "react"
import "./ErrorPage.style.css"

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>Server Error!</h1>
      <p>
        Something bad happened. It's not your fault, do not worry my friend -
        <strong> Be Happy!</strong>
      </p>
    </div>
  )
}

export default ErrorPage
