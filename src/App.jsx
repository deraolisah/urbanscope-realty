import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import PropertyProvider from "./contexts/PropertyContext";

function App() {
  return (
    <PropertyProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PropertyProvider>
  )
}  

export default App;