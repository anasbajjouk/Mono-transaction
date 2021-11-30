import React from "react"
import ErrorPage from "../../pages/errorPage/ErrorPage.component"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      hasErrored: false,
    }
  }

  static getDerivedStateFromError(error) {
    //Do something if needed
    return { hasErrored: true }
  }

  componentDidCatch(error, info) {
    // DO something if needed
    console.error("ErrorBoundary: ", error)
  }

  render() {
    if (this.state.hasErrored) {
      return <ErrorPage />
    }

    return this.props.children
  }
}

export default ErrorBoundary
