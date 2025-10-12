import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import PropertyProvider from "./contexts/PropertyContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <PropertyProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </PropertyProvider>
  )
}  

export default App;