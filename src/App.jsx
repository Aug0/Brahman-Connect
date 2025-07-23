import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { ErrorProvider } from "./context/ErrorContext";
import FallBackLoader from "./components/FalllBackLoader";
import ErrorBoundary from "./components/ErrorFallback";
import { renderRoutes } from "./renderRoutes";
import { routesConfig } from "./routesConfig";
function App() {
  useEffect(() => {
    const audio = new Audio("/audio/omMantra.mp3");
    audio.play().catch((error) => {
      console.log("Auto-play blocked:", error);
    });
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <ErrorProvider>
          <Suspense fallback={<FallBackLoader />}>
            <Routes>{renderRoutes(routesConfig)}</Routes>
          </Suspense>
        </ErrorProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
