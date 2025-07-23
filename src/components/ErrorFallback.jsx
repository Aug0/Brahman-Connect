import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div class="flex flex-col items-center justify-center min-h-screen bg-orange-100 px-4">
  <img
    src="https://static.thenounproject.com/png/504708-200.png"
    alt="Error illustration"
    className="w-40 h-40 mb-6"
  />
  <h1 class="text-3xl font-bold text-gray-800 mb-2">
    Oops! Something went wrong.
  </h1>
  <p class="text-lg text-gray-600 mb-6">Please try again later.</p>
  <div class="text-center">
    <button
    onClick={() => window.location.reload()}
      class="px-6 py-2 bg-orange-400 text-white rounded-lg font-semibold hover:bg-[#6a4f97] transition"
    >
      Reload
    </button>
  </div>
</div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
