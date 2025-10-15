// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import PropertyProvider from "./contexts/PropertyContext";
import AuthProvider from "./contexts/AuthContext";
import FavoritesProvider from "./contexts/FavoritesContext";

function App() {
  return (
    <PropertyProvider>
      <AuthProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    </PropertyProvider>
  )
}  

export default App;